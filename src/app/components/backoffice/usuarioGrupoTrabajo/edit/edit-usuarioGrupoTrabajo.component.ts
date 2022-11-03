import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {UsuarioGrupoTrabajoService} from '../../../../core/services/usuarioGrupoTrabajo.service';
import { UsuarioGrupoTrabajo } from '../../../../core/models/UsuarioGrupoTrabajo';


import { GrupoTrabajoService } from '../../../../core/services/grupoTrabajo.service';
import { GrupoTrabajo } from '../../../../core/models/GrupoTrabajo';
import { UsuariosService } from '../../../../core/services/usuarios.service';
import { Usuarios } from '../../../../core/models/Usuarios';



@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-usuarioGrupoTrabajo.component.html',
  styleUrls: ['./edit-usuarioGrupoTrabajo.component.css']
})
export class EditUsuarioGrupoTrabajoComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;

  dataSource = [];
  dataSourceU = [];
  data = [];
  data2 = [];
  idempre = 0
  idgrupo =  0
  idEmpresa = 0
  dataLista = []



  submitted = false;

  form: FormGroup = this.fb.group({
    idGrupo: [null, Validators.required],
    idUsuario: [null, Validators.required],
  });

  usuarioGrupoTrabajo: UsuarioGrupoTrabajo = new UsuarioGrupoTrabajo();

  constructor(private usuariosService: UsuariosService,private grupoTrabajoService: GrupoTrabajoService,private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,private usuarioGrupoTrabajoService: UsuarioGrupoTrabajoService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }
  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.usuarioGrupoTrabajoService.get(this.id).toPromise().then(resp => {
        this.usuarioGrupoTrabajo = resp;
        this.setInitForm();
      });
    } 
    this.usuarioGrupoTrabajoService.list(new UsuarioGrupoTrabajo()).toPromise().then(resp => {
      this.dataLista = resp;
    });

    this.grupoTrabajoService.list(new GrupoTrabajo()).toPromise().then(resp => {
      this.dataSource = resp;
    });  
    this.usuariosService.list(new Usuarios()).toPromise().then(resp => {
      this.data = resp;

      this.dataLista.forEach(element => {
        if (this.id == element.id) {
          this.idgrupo = element.idGrupo
        }
      });
      
      this.dataSource.forEach(element => {  
        if (element.id == this.idgrupo) {
            this.idEmpresa = element.idEmpresa
        }
      });
      this.data.forEach(element => {
        if (element.idEmpresa == this.idEmpresa) {
            this.dataSourceU.push(element)
          }
      });
    });
    switch (this.type) {
      case 'a':
        this.add = true;

        break;
      case 'e':
        this.edit = true;   
        break;
      case 'd':
        this.delete = true;
        this.form.disable();
        break;
      case 'v':
        this.view = true;
        this.form.disable();
        break;
    }
  }
  onSelect(id: any): void { 
    this.dataSourceU = [];
      this.dataSource.forEach(element => {
        if (element.id == id) {
          this.idempre = element.idEmpresa
        }
      });
      this.data.forEach(element => {
        if (this.idempre == element.idEmpresa) {
          this.dataSourceU.push(element)
        }
      });
  }

  get fc() {
    return this.form.controls;
  }

  get fv() {
    return this.form.value;
  }

  setInitForm() {
    this.fc.idGrupo.setValue(this.usuarioGrupoTrabajo.idGrupo);
    this.fc.idUsuario.setValue(this.usuarioGrupoTrabajo.idUsuario);
  }

  setForm() {
    this.usuarioGrupoTrabajo.idGrupo = this.fv.idGrupo;
    this.usuarioGrupoTrabajo.idUsuario = this.fv.idUsuario;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.usuarioGrupoTrabajoService.save(this.usuarioGrupoTrabajo).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessUpdate
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorUpdate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'usuarioGrupoTrabajo']);
            });
          });
      }


      if (this.add) {
        this.usuarioGrupoTrabajo = new UsuarioGrupoTrabajo();
        this.setForm();
        this.usuarioGrupoTrabajoService.insert(this.usuarioGrupoTrabajo).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'usuarioGrupoTrabajo']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'usuarioGrupoTrabajo']);
            });
          });
      }
    }
    if (this.delete) {
      this.usuarioGrupoTrabajoService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'usuarioGrupoTrabajo']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'usuarioGrupoTrabajo']);
          });
        }
      );
    }
  }

}
