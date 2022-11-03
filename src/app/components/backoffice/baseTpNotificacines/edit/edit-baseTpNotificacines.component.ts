import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {BaseTpNotificacinesService} from '../../../../core/services/baseTpNotificacines.service';
import {BaseTpNotificacines} from '../../../../core/models/BaseTpNotificacines';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-baseTpNotificacines.component.html',
  styleUrls: ['./edit-baseTpNotificacines.component.css']
})
export class EditBaseTpNotificacinesComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;


  submitted = false;

  form: FormGroup = this.fb.group({
    descripcion: [null, Validators.required],
    diasEnvio: [null, Validators.required],
    fechaCreacion: [null, Validators.required],
    usuario: [null, Validators.required],
  });

  baseTpNotificacines: BaseTpNotificacines = new BaseTpNotificacines();

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private baseTpNotificacinesService: BaseTpNotificacinesService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.baseTpNotificacinesService.get(this.id).toPromise().then(resp => {
        this.baseTpNotificacines = resp;
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
    this.fc.descripcion.setValue(this.baseTpNotificacines.descripcion);
    this.fc.diasEnvio.setValue(this.baseTpNotificacines.diasEnvio);
    this.fc.fechaCreacion.setValue(this.baseTpNotificacines.fechaCreacion);
    this.fc.usuario.setValue(this.baseTpNotificacines.usuario);

  }

  setForm() {
    this.baseTpNotificacines.descripcion = this.fv.descripcion;
    this.baseTpNotificacines.diasEnvio = this.fv.diasEnvio;
    this.baseTpNotificacines.fechaCreacion = this.fv.fechaCreacion;
    this.baseTpNotificacines.usuario = this.fv.usuario;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.baseTpNotificacinesService.save(this.baseTpNotificacines).subscribe(
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
              this.router.navigate(['/backoffice', 'baseTpNotificacines']);
            });
          });
      }


      if (this.add) {
        this.baseTpNotificacines = new BaseTpNotificacines();
        this.setForm();
        this.baseTpNotificacinesService.insert(this.baseTpNotificacines).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'baseTpNotificacines']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'baseTpNotificacines']);
            });
          });
      }
    }
    if (this.delete) {
      this.baseTpNotificacinesService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'baseTpNotificacines']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'baseTpNotificacines']);
          });
        }
      );
    }
  }

}
