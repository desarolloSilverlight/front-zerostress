import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ModuloService} from '../../../../core/services/modulo.service';
import {Modulo} from '../../../../core/models/Modulo';
import {RoleService} from '../../../../core/services/role.service';
import {ModuloOpcion} from '../../../../core/models/ModuloOpcion';
import {ModuloOpcioneService} from '../../../../core/services/moduloOpcion.service';
import {ModuloOpcionRol} from '../../../../core/models/ModuloOpcionRol';
import {PermisoService} from '../../../../core/services/permiso.service';
import {Permiso} from '../../../../core/models/Permiso';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';


@Component({
  selector: 'app-roles-asoc-opciones',
  templateUrl: './roles-asoc-opciones.component.html',
  styleUrls: ['./roles-asoc-opciones.component.css']
})
export class RolesAsocOpcionesComponent implements OnInit {

  form: FormGroup = this.fb.group([]);
  id: number;
  modulos: Modulo[] = [];
  permisos: ModuloOpcionRol[] = [];
  opciones: ModuloOpcion[] = [];

  constructor(private fb: FormBuilder, private actRoute: ActivatedRoute, private moduloService: ModuloService,
              private roleService: RoleService, private moduloOpcion: ModuloOpcioneService, private permisoService: PermisoService) {
    this.id = this.actRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    const m = new Modulo();
    this.moduloService.list(m).toPromise().then(resp => {
      this.modulos = resp;
    });
    const moduloOpcion = new ModuloOpcion();
    this.moduloOpcion.listVi(moduloOpcion).toPromise().then(resp => {
      const moduloOpcionRol = new ModuloOpcionRol();
      moduloOpcionRol.idRol = this.id;
      this.roleService.listPermisos(moduloOpcionRol).toPromise().then(r => {
        this.permisos = r;
        resp.forEach(s => {
          this.form.addControl(`checkbox-${s.id}`, new FormControl(this.permisos.filter(a => a.idModuloOpcion === s.id).length > 0));
        });
        this.opciones = resp;
      });
    });
  }

  save() {
    for (const opcion of this.opciones) {
      const permiso = this.permisos.filter(s => s.idModuloOpcion === opcion.id)[0];
      if (permiso !== undefined) {
        if (!this.form.get(`checkbox-${opcion.id}`).value) {
          this.permisoService.delete(permiso.idPermiso).toPromise().then();
        }
      } else {
        const per = new Permiso();
        per.idModuloOpcion = opcion.id;
        per.idRol = this.id;
        this.permisoService.insert(per).toPromise().then();
      }
    }
    Swal.fire({
      title: Mensajes.titleSuccess,
      icon: 'success',
      text: Mensajes.textSuccessUpdate
    });
  }

  filterOpciones(modulo: Modulo) {
    return this.opciones.filter(s => s.idModulo === modulo.id);
  }

}
