import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {SbCausasEstresService} from '../../../../core/services/sbCausasEstres.service';
import {SbCausasEstres} from '../../../../core/models/SbCausasEstres';
import {ParametrosService} from '../../../../core/services/parametros.service';
import {Parametros} from '../../../../core/models/Parametros';
import { TP_PARAMETROS } from 'src/app/core/constants/Parametros';
@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-sbCausasEstres.component.html',
  styleUrls: ['./edit-sbCausasEstres.component.css']
})
export class EditSbCausasEstresComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;

  tpEnergiaCate = []
  tpCausas = []

  submitted = false;

  form: FormGroup = this.fb.group({
    tpCausa: [null, Validators.required],
    tpCatCausa: [null, Validators.required],
    descripcion: [null, Validators.required],
  });

  sbCausasEstres: SbCausasEstres = new SbCausasEstres();

  constructor(private parametroService: ParametrosService,private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private sbCausasEstresService: SbCausasEstresService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      const tpCausa = new Parametros();
      //tpCausa.idTpParametro = TP_PARAMETROS.TP_CAUSA;
      tpCausa.idTpParametro = TP_PARAMETROS.TP_ENERGIA;
      this.parametroService.list(tpCausa).toPromise().then(r => {
        this.tpCausas = r;
        console.log(this.tpCausas)
      });
      const tpCausaCat = new Parametros();
      tpCausaCat.idTpParametro = TP_PARAMETROS.TP_ENERGIA_CAT;
      this.parametroService.list(tpCausaCat).toPromise().then(r => {
        this.tpEnergiaCate = r;
      });
      this.sbCausasEstresService.get(this.id).toPromise().then(resp => {
        this.sbCausasEstres = resp;
        this.setInitForm();
      });
    }
    switch (this.type) {
      case 'a':
        const tpCausa = new Parametros();
        //tpCausa.idTpParametro = TP_PARAMETROS.TP_CAUSA;
        tpCausa.idTpParametro = TP_PARAMETROS.TP_ENERGIA;
        this.parametroService.list(tpCausa).toPromise().then(r => {
          this.tpCausas = r;
        });
        const tpCausaCat = new Parametros();
        tpCausaCat.idTpParametro = TP_PARAMETROS.TP_ENERGIA_CAT;
        this.parametroService.list(tpCausaCat).toPromise().then(r => {
          this.tpEnergiaCate = r;
        });
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
    this.fc.tpCausa.setValue(this.sbCausasEstres.tpCausa);
    this.fc.tpCatCausa.setValue(this.sbCausasEstres.tpCatCausa);
    this.fc.descripcion.setValue(this.sbCausasEstres.descripcion);
  }

  setForm() {
    this.sbCausasEstres.tpCausa = this.fv.tpCausa;
    this.sbCausasEstres.tpCatCausa = this.fv.tpCatCausa;
    this.sbCausasEstres.descripcion = this.fv.descripcion;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.sbCausasEstresService.save(this.sbCausasEstres).subscribe(
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
              this.router.navigate(['/backoffice', 'sbCausasEstres']);
            });
          });
      }


      if (this.add) {
        this.sbCausasEstres = new SbCausasEstres();
        this.setForm();
        this.sbCausasEstresService.insert(this.sbCausasEstres).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'sbCausasEstres']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'sbCausasEstres']);
            });
          });
      }
    }
    if (this.delete) {
      this.sbCausasEstresService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'sbCausasEstres']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'sbCausasEstres']);
          });
        }
      );
    }
  }

}
