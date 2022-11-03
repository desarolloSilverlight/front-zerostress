import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {ParametrosService} from '../../../../core/services/parametros.service';
import {Parametros} from '../../../../core/models/Parametros';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-parametros.component.html',
  styleUrls: ['./edit-parametros.component.css']
})
export class EditParametrosComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;
  tpParam :number;


  submitted = false;

  form: FormGroup = this.fb.group({
    descripcion: [null, Validators.required],
    alfanumerico: [null, Validators.required],
    numerico: [null, Validators.required],
  });

  parametros: Parametros = new Parametros();

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private parametrosService: ParametrosService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.parametrosService.get(this.id).toPromise().then(resp => {
        this.parametros = resp;
        this.tpParam=resp.idTpParametro;
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
    this.fc.descripcion.setValue(this.parametros.descripcion);
    this.fc.alfanumerico.setValue(this.parametros.alfanumerico);
    this.fc.numerico.setValue(this.parametros.numerico);

  }

  setForm() {
    this.parametros.descripcion = this.fv.descripcion;
    this.parametros.alfanumerico = this.fv.alfanumerico;
    this.parametros.numerico = this.fv.numerico;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.parametrosService.save(this.parametros).subscribe(
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
              this.router.navigate(['/backoffice', 'parametros', 'list', this.parametros.idTpParametro]);
            });
          });
      }


      if (this.add) {
        this.parametros = new Parametros();
        this.setForm();
        this.parametros.idTpParametro = this.id;
        this.parametrosService.insert(this.parametros).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'parametros', 'list', this.id]);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'parametros', 'list', this.id]);
            });
          });
      }
    }
    if (this.delete) {
      this.parametrosService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'parametros', 'list', this.parametros.idTpParametro]);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'parametros', 'list', this.parametros.idTpParametro]);
          });
        }
      );
    }
  }

}
