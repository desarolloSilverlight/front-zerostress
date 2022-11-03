import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {TemasConsultaService} from '../../../../core/services/temasConsulta.service';
import {TemasConsulta} from '../../../../core/models/TemasConsulta';
import {ActivatedRoute, Router} from '@angular/router';
import {GruposDiagnostico} from '../../../../core/models/GruposDiagnostico';
import {GruposDiagnosticoService} from '../../../../core/services/gruposDiagnostico.service';
import {ParametrosService} from '../../../../core/services/parametros.service';
import {Parametros} from '../../../../core/models/Parametros';
import {TP_PARAMETROS} from 'src/app/core/constants/Parametros';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-temasConsulta.component.html',
  styleUrls: ['./edit-temasConsulta.component.css']
})
export class EditTemasConsultaComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;

  gruposDiagnostico = []
  tpEnergias = []
  tpCerebros = []

  submitted = false;

  form: FormGroup = this.fb.group({
    idGrupo: [null, Validators.required],
    tpEnergia: [null, Validators.required],
    nRepeticiones: [null, Validators.required],
    tpCerebro: [null, Validators.required],
    orden: [null, Validators.required],
    snHab: [null],
    descripcion: [null]
  });

  temasConsulta: TemasConsulta = new TemasConsulta();

  constructor(private parametroService: ParametrosService, private gruposDiagnosticoService: GruposDiagnosticoService,
              private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private temasConsultaService: TemasConsultaService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {

      this.gruposDiagnosticoService.list(new GruposDiagnostico()).toPromise().then(resp => {
        this.gruposDiagnostico = resp;
      });

      const tpEnergia = new Parametros();
      tpEnergia.idTpParametro = TP_PARAMETROS.TP_ENERGIA;
      this.parametroService.list(tpEnergia).toPromise().then(r => {
        this.tpEnergias = r;
      });

      const tpCerebro = new Parametros();
      tpCerebro.idTpParametro = TP_PARAMETROS.TP_CEREBRO;
      this.parametroService.list(tpCerebro).toPromise().then(r => {
        this.tpCerebros = r;
      });

      this.temasConsultaService.get(this.id).toPromise().then(resp => {
        this.temasConsulta = resp;
        this.setInitForm();
      });
    }
    switch (this.type) {
      case 'a':
        this.add = true;

        this.gruposDiagnosticoService.list(new GruposDiagnostico()).toPromise().then(resp => {
          this.gruposDiagnostico = resp;
        });

        const tpEnergia = new Parametros();
        tpEnergia.idTpParametro = TP_PARAMETROS.TP_ENERGIA;
        this.parametroService.list(tpEnergia).toPromise().then(r => {
          this.tpEnergias = r;
        });

        const tpCerebro = new Parametros();
        tpCerebro.idTpParametro = TP_PARAMETROS.TP_CEREBRO;
        this.parametroService.list(tpCerebro).toPromise().then(r => {
          this.tpCerebros = r;
        });

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
    this.fc.idGrupo.setValue(this.temasConsulta.idGrupo);
    this.fc.tpEnergia.setValue(this.temasConsulta.tpEnergia);
    this.fc.nRepeticiones.setValue(this.temasConsulta.nRepeticiones);
    this.fc.tpCerebro.setValue(this.temasConsulta.tpCerebro);
    this.fc.orden.setValue(this.temasConsulta.orden);
    this.fc.snHab.setValue(this.temasConsulta.snHab);
    this.fc.descripcion.setValue(this.temasConsulta.descripcion);
  }

  setForm() {
    this.temasConsulta.idGrupo = this.fv.idGrupo;
    this.temasConsulta.tpEnergia = this.fv.tpEnergia;
    this.temasConsulta.nRepeticiones = this.fv.nRepeticiones;
    this.temasConsulta.tpCerebro = this.fv.tpCerebro;
    this.temasConsulta.orden = this.fv.orden;
    this.temasConsulta.snHab = this.fv.snHab;
    this.temasConsulta.descripcion = this.fv.descripcion;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.temasConsultaService.save(this.temasConsulta).subscribe(
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
              this.router.navigate(['/backoffice', 'temasConsulta']);
            });
          });
      }

      if (this.add) {
        this.temasConsulta = new TemasConsulta();
        this.setForm();
        this.temasConsultaService.insert(this.temasConsulta).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'temasConsulta']);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'temasConsulta']);
            });
          });
      }
    }


    if (this.delete) {
      this.temasConsultaService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'temasConsulta']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'temasConsulta']);
          });
        }
      );
    }
  }
}
