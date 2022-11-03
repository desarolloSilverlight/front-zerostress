import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {GrupoTrabajoService} from '../../../../core/services/grupoTrabajo.service';
import { GrupoTrabajo } from '../../../../core/models/GrupoTrabajo';
import { EmpresaService } from '../../../../core/services/empresa.service';
import { Empresa } from '../../../../core/models/Empresa';
@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-grupoTrabajo.component.html',
  styleUrls: ['./edit-grupoTrabajo.component.css']
})
export class EditGrupoTrabajoComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;

  dataSourceEm = [];


  submitted = false;

  form: FormGroup = this.fb.group({
    idEmpresa: [null, Validators.required],
    descripcion: [null, Validators.required],
  });

  grupoTrabajo: GrupoTrabajo = new GrupoTrabajo();

  constructor(private empresaService: EmpresaService,private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private grupoTrabajoService: GrupoTrabajoService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.grupoTrabajoService.get(this.id).toPromise().then(resp => {
        this.grupoTrabajo = resp;
        this.setInitForm();
      });
    }
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
      this.empresaService.list(new Empresa()).toPromise().then(resp => {
      this.dataSourceEm= resp;
    });
  }

  get fc() {
    return this.form.controls;
  }

  get fv() {
    return this.form.value;
  }

  setInitForm() {
    this.fc.idEmpresa.setValue(this.grupoTrabajo.idEmpresa);
    this.fc.descripcion.setValue(this.grupoTrabajo.descripcion);

  }

  setForm() {
    this.grupoTrabajo.idEmpresa = this.fv.idEmpresa;
    this.grupoTrabajo.descripcion = this.fv.descripcion;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.grupoTrabajoService.save(this.grupoTrabajo).subscribe(
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
              this.router.navigate(['/backoffice', 'grupoTrabajo']);
            });
          });
      }


      if (this.add) {
        this.grupoTrabajo = new GrupoTrabajo();
        this.setForm();
        this.grupoTrabajoService.insert(this.grupoTrabajo).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'grupoTrabajo']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'grupoTrabajo']);
            });
          });
      }
    }
    if (this.delete) {
      this.grupoTrabajoService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'grupoTrabajo']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'grupoTrabajo']);
          });
        }
      );
    }
  }

}
