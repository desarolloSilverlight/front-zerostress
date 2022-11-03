import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {ConsultasService} from '../../../../core/services/consultas.service';
import {Consultas} from '../../../../core/models/Consultas';
import {Consultantes} from '../../../../core/models/Consultantes';
import {ConsultantesService} from '../../../../core/services/consultantes.service';
import {ParametrosService} from '../../../../core/services/parametros.service';
import {Parametros} from '../../../../core/models/Parametros';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-consultas.component.html',
  styleUrls: ['./edit-consultas.component.css']
})
export class EditConsultasComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;
  consultantes = [];
  tipEstres: any = [];
  tipEnergia: any = [];
  tipCerebro: any = [];

  submitted = false;

  form: FormGroup = this.fb.group({
    idConsultante: [null, Validators.required],
    tpEstres: [null, Validators.required],
    tpEnergia: [null, Validators.required],
    tpCerebro: [null, Validators.required],
  });

  consultas: Consultas = new Consultas();

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private consultasService: ConsultasService, private consultantesService: ConsultantesService,
              private parametrosService: ParametrosService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  serviciosTpParametros(): void {
    const estres = new Parametros();
    estres.idTpParametro = 13;
    this.parametrosService.list(estres).toPromise().then(resp => {
      this.tipEstres = resp;
    });

    const energia = new Parametros();
    energia.idTpParametro = 12;
    this.parametrosService.list(energia).toPromise().then(resp => {
      this.tipEnergia = resp;
    });

    const cerebro = new Parametros();
    cerebro.idTpParametro = 11;
    this.parametrosService.list(cerebro).toPromise().then(resp => {
      this.tipCerebro = resp;
    });
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {

      this.serviciosTpParametros();

      this.consultantesService.list(new Consultantes()).toPromise().then(resp => {
        this.consultantes = resp;
      });
      this.consultasService.get(this.id).toPromise().then(resp => {
        this.consultas = resp;
        this.setInitForm();
      });

    }
    switch (this.type) {
      case 'a':
        this.add = true;
        this.consultantesService.list(new Consultantes()).toPromise().then(resp => {
          this.consultantes = resp;
        });
        this.serviciosTpParametros();
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
    this.fc.idConsultante.setValue(this.consultas.idConsultante);
    // this.fc.tpEstres.setValue(this.consultas.tpEstres);
    // this.fc.tpEnergia.setValue(this.consultas.tpEnergia);
    // this.fc.tpCerebro.setValue(this.consultas.tpCerebro);

  }

  setForm() {
    this.consultas.idConsultante = this.fv.idConsultante;
    // this.consultas.tpEstres = this.fv.tpEstres;
    // this.consultas.tpEnergia = this.fv.tpEnergia;
    // this.consultas.tpCerebro = this.fv.tpCerebro;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.consultasService.save(this.consultas).subscribe(
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
              this.router.navigate(['/backoffice', 'consultas']);
            });
          });
      }


      if (this.add) {
        this.consultas = new Consultas();
        this.setForm();
        this.consultasService.insert(this.consultas).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'consultas']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'consultas']);
            });
          });
      }
    }
    if (this.delete) {
      this.consultasService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'consultas']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'consultas']);
          });
        }
      );
    }
  }

}
