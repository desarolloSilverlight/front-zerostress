import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {FormulariosService} from '../../../../core/services/formularios.service';
import {Formularios} from '../../../../core/models/Formularios';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-formularios.component.html',
  styleUrls: ['./edit-formularios.component.css']
})
export class EditFormulariosComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;


  submitted = false;

  form: FormGroup = this.fb.group({
    titulo: [null, Validators.required],
    prIngreso:[null,]
  });

  formularios: Formularios = new Formularios();

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private formulariosService: FormulariosService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.formulariosService.get(this.id).toPromise().then(resp => {
        this.formularios = resp;
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
    this.fc.titulo.setValue(this.formularios.titulo);
    this.fc.prIngreso.setValue(this.formularios.prIngreso);
  }

  setForm() {
    this.formularios.titulo = this.fv.titulo;
    this.formularios.prIngreso = this.fv.prIngreso; 
    console.log(this.formularios.prIngreso)
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.formulariosService.save(this.formularios).subscribe(
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
              this.router.navigate(['/backoffice', 'formularios']);
            });
          });
      }

      if (this.add) {
        this.formularios = new Formularios();
        this.setForm();
        this.formulariosService.insert(this.formularios).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'formularios']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'formularios']);
            });
          });
      }
    }
    if (this.delete) {
      this.formulariosService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'formularios']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'formularios']);
          });
        }
      );
    }
  }

}
