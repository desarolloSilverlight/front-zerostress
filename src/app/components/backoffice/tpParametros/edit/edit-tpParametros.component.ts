import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {TpParametro} from '../../../../core/models/TpParametro';
import {TpParametroService} from '../../../../core/services/tpParametros.service';

@Component({
  selector: 'app-edit-tp-paramtros',
  templateUrl: './edit-tpParametros.component.html',
  styleUrls: ['./edit-tpParametros.component.css']
})
export class EditTpParametrosComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;


  submitted = false;

  form: FormGroup = this.fb.group({
    descripcion: [null, Validators.required],
    titulo: [null]
  });

  tpParametro: TpParametro = new TpParametro();

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private tpParametroService: TpParametroService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.tpParametroService.get(this.id).toPromise().then(resp => {
        this.tpParametro = resp;
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
    this.fc.descripcion.setValue(this.tpParametro.descripcion);
    this.fc.titulo.setValue(this.tpParametro.titulo);
  }

  setForm() {
    this.tpParametro.descripcion = this.fv.descripcion;
    this.tpParametro.titulo = this.fv.titulo;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.tpParametroService.save(this.tpParametro).subscribe(
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
              this.router.navigate(['/backoffice', 'tpParametros']);
            });
          });
      }


      if (this.add) {
        this.tpParametro = new TpParametro();
        this.setForm();
        this.tpParametroService.insert(this.tpParametro).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'tpParametros']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'tpParametros']);
            });
          });
      }
    }
    if (this.delete) {
      this.tpParametroService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'tpParametros']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'tpParametros']);
          });
        }
      );
    }
  }

}
