import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Modulo} from '../../../../core/models/Modulo';
import Swal from 'sweetalert2';
import {ModuloService} from '../../../../core/services/modulo.service';
import {Mensajes} from '../../../../core/constants/Mensajes';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-modulos.component.html',
  styleUrls: ['./edit-modulos.component.css']
})
export class EditModulosComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;


  submitted = false;

  form: FormGroup = this.fb.group({
    titulo: [null, Validators.required],
    icon: [null],
    orden: [null]
  });

  modulo: Modulo = new Modulo();

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private moduloService: ModuloService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.moduloService.get(this.id).toPromise().then(resp => {
        this.modulo = resp;
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
    this.fc.titulo.setValue(this.modulo.titulo);
    this.fc.icon.setValue(this.modulo.icon);
    this.fc.orden.setValue(this.modulo.orden);
  }

  setForm() {
    this.modulo.titulo = this.fv.titulo;
    this.modulo.icon = this.fv.icon;
    this.modulo.orden = this.fv.orden;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.moduloService.save(this.modulo).subscribe(
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
              this.router.navigate(['/backoffice', 'modulos']);
            });
          });
      }


      if (this.add) {
        this.modulo = new Modulo();
        this.setForm();
        this.moduloService.insert(this.modulo).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'modulos']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'modulos']);
            });
          });
      }
    }
    if (this.delete) {
      this.moduloService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'modulos']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'modulos']);
          });
        }
      );
    }
  }

}
