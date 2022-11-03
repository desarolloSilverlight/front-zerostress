import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {BaseNotificacionesService} from '../../../../core/services/baseNotificaciones.service';
import {BaseNotificaciones} from '../../../../core/models/BaseNotificaciones';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-baseNotificaciones.component.html',
  styleUrls: ['./edit-baseNotificaciones.component.css']
})
export class EditBaseNotificacionesComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;


  submitted = false;

  form: FormGroup = this.fb.group({
    orden: [null, Validators.required],
    texto: [null, Validators.required],
    idBaseTpNotificacion: [null, Validators.required],
    fechaCreacion: [null, Validators.required],
    usuario: [null, Validators.required],
  });

  baseNotificaciones: BaseNotificaciones = new BaseNotificaciones();

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private baseNotificacionesService: BaseNotificacionesService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.baseNotificacionesService.get(this.id).toPromise().then(resp => {
        this.baseNotificaciones = resp;
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
  }

  get fc() {
    return this.form.controls;
  }

  get fv() {
    return this.form.value;
  }

  setInitForm() {
    this.fc.orden.setValue(this.baseNotificaciones.orden);
    this.fc.texto.setValue(this.baseNotificaciones.texto);
    this.fc.idBaseTpNotificacion.setValue(this.baseNotificaciones.idBaseTpNotificacion);
    this.fc.fechaCreacion.setValue(this.baseNotificaciones.fechaCreacion);
    this.fc.usuario.setValue(this.baseNotificaciones.usuario);

  }

  setForm() {
    this.baseNotificaciones.orden = this.fv.orden;
    this.baseNotificaciones.texto = this.fv.texto;
    this.baseNotificaciones.idBaseTpNotificacion = this.fv.idBaseTpNotificacion;
    this.baseNotificaciones.fechaCreacion = this.fv.fechaCreacion;
    this.baseNotificaciones.usuario = this.fv.usuario;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.baseNotificacionesService.save(this.baseNotificaciones).subscribe(
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
              this.router.navigate(['/backoffice', 'baseNotificaciones']);
            });
          });
      }


      if (this.add) {
        this.baseNotificaciones = new BaseNotificaciones();
        this.setForm();
        this.baseNotificacionesService.insert(this.baseNotificaciones).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'baseNotificaciones']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'baseNotificaciones']);
            });
          });
      }
    }
    if (this.delete) {
      this.baseNotificacionesService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'baseNotificaciones']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'baseNotificaciones']);
          });
        }
      );
    }
  }

}
