import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {ModuloOpcioneService} from '../../../../core/services/moduloOpcion.service';
import {ModuloOpcion} from '../../../../core/models/ModuloOpcion';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-modulosOpciones.component.html',
  styleUrls: ['./edit-modulosOpciones.component.css']
})
export class EditModulosOpcionesComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;


  submitted = false;

  form: FormGroup = this.fb.group({
    titulo: [null, Validators.required],
    descripcion: [null, Validators.required],
    orden: [null],
    link: [null, Validators.required]
  });

  moduloOpcion: ModuloOpcion = new ModuloOpcion();

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private moduloOpcionService: ModuloOpcioneService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.moduloOpcionService.get(this.id).toPromise().then(resp => {
        this.moduloOpcion = resp;
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
    this.fc.titulo.setValue(this.moduloOpcion.titulo);
    this.fc.descripcion.setValue(this.moduloOpcion.descripcion);
    this.fc.orden.setValue(this.moduloOpcion.orden);
    this.fc.link.setValue(this.moduloOpcion.link);
  }

  setForm() {
    this.moduloOpcion.titulo = this.fv.titulo;
    this.moduloOpcion.descripcion = this.fv.descripcion;
    this.moduloOpcion.orden = this.fv.orden;
    this.moduloOpcion.link = this.fv.link;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.moduloOpcionService.save(this.moduloOpcion).subscribe(
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
              this.router.navigate(['/backoffice', 'modulosOpciones', 'list', this.moduloOpcion.idModulo]);
            });
          });
      }


      if (this.add) {
        this.moduloOpcion = new ModuloOpcion();
        this.setForm();
        this.moduloOpcion.idModulo = this.id;
        this.moduloOpcionService.insert(this.moduloOpcion).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'modulosOpciones', 'list', this.moduloOpcion.idModulo]);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'modulosOpciones', 'list', this.moduloOpcion.idModulo]);
            });
          });
      }
    }
    if (this.delete) {
      this.moduloOpcionService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'modulosOpciones', 'list', this.moduloOpcion.idModulo]);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'modulosOpciones', 'list', this.moduloOpcion.idModulo]);
          });
        }
      );
    }
  }

}
