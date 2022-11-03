import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {PreguntasService} from '../../../../core/services/preguntas.service';
import {Preguntas} from '../../../../core/models/Preguntas';
import {ParametrosService} from '../../../../core/services/parametros.service';
import {Parametros} from '../../../../core/models/Parametros';
import {TP_PARAMETROS} from '../../../../core/constants/Parametros';
import {GruposDiagnostico} from '../../../../core/models/GruposDiagnostico';
import {GruposDiagnosticoService} from '../../../../core/services/gruposDiagnostico.service';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-preguntas.component.html',
  styleUrls: ['./edit-preguntas.component.css']
})
export class EditPreguntasComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;
  idForm : number
  tipConsultante = [];
  diagnostico=[];

  submitted = false;

  form: FormGroup = this.fb.group({
    descripcion: [null, Validators.required],
    orden: [null, Validators.required],
    tpPregunta: [null],
    minValor: [null],
    maxValor: [null],
    tpConsultante: [null],
    grupoDiag:[null]
  });

  preguntas: Preguntas = new Preguntas();

  tpPreguntasList = [];

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private preguntasService: PreguntasService, private parametroService: ParametrosService,
              private gruposDiagnosticoService: GruposDiagnosticoService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ConsumirServicios():void{
    const estres = new Parametros();
    estres.idTpParametro = 14;
    this.parametroService.list(estres).toPromise().then(resp => {
      this.tipConsultante = resp;
    })
    this.gruposDiagnosticoService.list(new GruposDiagnostico()).toPromise().then(resp => {
      this.diagnostico = resp;
    });
  }
  ngOnInit(): void {
    const p: Parametros = new Parametros();
    p.idTpParametro = TP_PARAMETROS.TP_PREGUNTA;
    this.parametroService.list(p).toPromise().then(r => {
      this.tpPreguntasList = r;
    });
    this.ConsumirServicios();
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.preguntasService.get(this.id).toPromise().then(resp => {
        this.preguntas = resp;
        this.idForm = resp.idFormulario
        this.setInitForm();
      });
    }
    switch (this.type) {
      case 'a':
        this.add = true;
        this.idForm = this.id
        this.ConsumirServicios();
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
    this.fc.descripcion.setValue(this.preguntas.descripcion);
    this.fc.orden.setValue(this.preguntas.orden);
    this.fc.tpPregunta.setValue(this.preguntas.tpPregunta);
    this.fc.minValor.setValue(this.preguntas.minValor);
    this.fc.maxValor.setValue(this.preguntas.maxValor);
    this.fc.tpConsultante.setValue(this.preguntas.tpConsultante);
    this.fc.grupoDiag.setValue(this.preguntas.grupoDiag);
  }

  setForm() {
    this.preguntas.descripcion = this.fv.descripcion;
    this.preguntas.orden = this.fv.orden;
    this.preguntas.tpPregunta = this.fv.tpPregunta;
    this.preguntas.minValor = this.fv.minValor;
    this.preguntas.maxValor = this.fv.maxValor;
    this.preguntas.tpConsultante = this.fv.tpConsultante;
    this.preguntas.grupoDiag = this.fv.grupoDiag;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.preguntasService.save(this.preguntas).subscribe(
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
              this.router.navigate(['/backoffice', 'preguntas','list',this.idForm]);
            });
          });
      }
      if (this.add) {
        this.preguntas = new Preguntas();
        this.setForm();
        this.preguntas.idFormulario = this.id;
        this.preguntasService.insert(this.preguntas).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'preguntas','list',this.idForm]);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'preguntas','list',this.idForm]);
            });
          });
      }
    }
    if (this.delete) {
      this.preguntasService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'preguntas','list',this.idForm]);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'preguntas','list',this.idForm]);
          });
        }
      );
    }
  }

}
