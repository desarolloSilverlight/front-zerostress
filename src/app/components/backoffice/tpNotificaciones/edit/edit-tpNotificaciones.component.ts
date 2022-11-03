import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {TpNotificacionesService} from '../../../../core/services/tpNotificaciones.service';
import {TpNotificaciones} from '../../../../core/models/TpNotificaciones';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-tpNotificaciones.component.html',
  styleUrls: ['./edit-tpNotificaciones.component.css']
})
export class EditTpNotificacionesComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;


  submitted = false;

  form: FormGroup = this.fb.group({
    archivo: [null, Validators.required],
    descripcion: [null, Validators.required],
    subject: [null, Validators.required],
  });

  tpNotificaciones: TpNotificaciones = new TpNotificaciones();

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private tpNotificacionesService: TpNotificacionesService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.tpNotificacionesService.get(this.id).toPromise().then(resp => {
        this.tpNotificaciones = resp;
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
    this.fc.archivo.setValue(this.tpNotificaciones.archivo);
    this.fc.descripcion.setValue(this.tpNotificaciones.descripcion);
    this.fc.subject.setValue(this.tpNotificaciones.subject);

  }

  setForm() {
    this.tpNotificaciones.archivo = this.fv.archivo;
    this.tpNotificaciones.descripcion = this.fv.descripcion;
    this.tpNotificaciones.subject = this.fv.subject;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.tpNotificacionesService.save(this.tpNotificaciones).subscribe(
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
              this.router.navigate(['/backoffice', 'tpNotificaciones']);
            });
          });
      }


      if (this.add) {
        this.tpNotificaciones = new TpNotificaciones();
        this.setForm();
        this.tpNotificacionesService.insert(this.tpNotificaciones).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'tpNotificaciones']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'tpNotificaciones']);
            });
          });
      }
    }
    if (this.delete) {
      this.tpNotificacionesService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'tpNotificaciones']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'tpNotificaciones']);
          });
        }
      );
    }
  }

}
