import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {ReglasPreguntaService} from '../../../../core/services/reglasPregunta.service';
import {ReglasPregunta} from '../../../../core/models/ReglasPregunta';
import {Parametros} from '../../../../core/models/Parametros';
import {TP_PARAMETROS} from '../../../../core/constants/Parametros';
import {ParametrosService} from '../../../../core/services/parametros.service';
import {PreguntasService} from '../../../../core/services/preguntas.service';
import {Preguntas} from '../../../../core/models/Preguntas';
import {Contenidos} from '../../../../core/models/Contenidos';
import {ContenidosService} from '../../../../core/services/contenidos.service';
import {variable} from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-reglasPregunta.component.html',
  styleUrls: ['./edit-reglasPregunta.component.css']
})
export class EditReglasPreguntaComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;
  retornaList = [];
  retornasIds = [];
  retornaContent = [];
  idPregun: number;
  idFor: number;

  submitted = false;

  preguntas: Preguntas[] = [];
  conten: Contenidos[] = [];

  form: FormGroup = this.fb.group({
    tpCondicion: [null, Validators.required],
    valor: [null, Validators.required],
    minValor: [null, Validators.required],
    maxValor: [null, Validators.required],
    retornaA: [null, Validators.required],
    idRetornaA: [null, Validators.required],
  });

  reglasPregunta: ReglasPregunta = new ReglasPregunta();

  constructor(private contenidosService: ContenidosService, private parametrosService: ParametrosService,
              private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private reglasPreguntaService: ReglasPreguntaService,
              private preguntasService: PreguntasService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    const p = new Parametros();
    p.idTpParametro = TP_PARAMETROS.TP_RETORNA_A;
    this.parametrosService.list(p).toPromise().then(r => {
      this.retornaList = r;
    });
    const p2 = new Parametros();
    p2.idTpParametro = TP_PARAMETROS.TP_CONDICION;
    this.parametrosService.list(p2).toPromise().then(re => {
      this.retornaContent = re;
    });
    const pre = new Preguntas();
    const cont = new Contenidos();
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.reglasPreguntaService.get(this.id).toPromise().then(resp => {
        this.reglasPregunta = resp;
        this.idPregun = resp.idPregunta;
        this.preguntasService.get(resp.idPregunta).toPromise().then(r => {
          pre.idFormulario = r.idFormulario;
          this.preguntasService.list(pre).toPromise().then(res => {
            this.preguntas = res;
            // cont.idFormulario = r.idFormulario;
            this.contenidosService.list(cont).toPromise().then(respu => {
              this.conten = respu;
            });
          });
        });
        this.setInitForm();
      });
    }
    switch (this.type) {
      case 'a':
        this.add = true;
        this.idPregun = this.id;
        this.preguntasService.get(this.id).toPromise().then(r => {
          pre.idFormulario = r.idFormulario;
          this.preguntasService.list(pre).toPromise().then(res => {
            this.preguntas = res;
            // cont.idFormulario = r.idFormulario;
            this.contenidosService.list(cont).toPromise().then(resp => {
              this.conten = resp;
            });
          });
        });
        break;
      case 'e':

        this.traerDAta();
        this.edit = true;
        break;
      case 'd':

        this.traerDAta();
        this.delete = true;
        this.form.disable();
        break;
      case 'v':

        this.traerDAta();
        this.view = true;
        this.form.disable();
        break;
    }
  }

  traerDAta() {
    this.reglasPreguntaService.get(this.id).toPromise().then(resp => {
      this.reglasPregunta = resp;
      this.preguntas = [];
      this.conten = [];
      const pregun = new Preguntas();
      const contenim = new Contenidos();
      this.preguntasService.get(resp.idPregunta).toPromise().then(r1 => {

        pregun.idFormulario = r1.idFormulario;
        // contenim.idFormulario = r1.idFormulario

        if (this.reglasPregunta.retornaA === 2) {
          this.preguntasService.list(pregun).toPromise().then(r => {
            this.preguntas = r;
            const arr = [];
            for (const pre of r) {
              arr.push({label: pre.descripcion, value: pre.id});
            }
            this.retornasIds = arr;
          });
        } else {
          if (this.reglasPregunta.retornaA === 1) {
            this.contenidosService.list(contenim).toPromise().then(r => {
              this.conten = r;
              const arr = [];
              for (const conten of this.conten) {
                arr.push({label: conten.titulo, value: conten.id});
              }
              this.retornasIds = arr;
            });
          }
        }
      });
    });
  }


  changeRetorna(param: Parametros) {
    if (param.numerico === 2) {
      const arr = [];
      for (const pre of this.preguntas) {
        arr.push({label: pre.descripcion, value: pre.id});
      }
      console.log(this.preguntas);
      this.retornasIds = arr;
    } else {
      if (param.numerico === 1) {
        const arr = [];
        for (const conten of this.conten) {
          arr.push({label: conten.titulo, value: conten.id});
        }
        this.retornasIds = arr;
        console.log(this.retornasIds);
      }
    }
  }

  get fc() {
    return this.form.controls;
  }

  get fv() {
    return this.form.value;
  }

  setInitForm() {
    this.fc.tpCondicion.setValue(this.reglasPregunta.tpCondicion);
    this.fc.valor.setValue(this.reglasPregunta.valor);
    this.fc.minValor.setValue(this.reglasPregunta.minValor);
    this.fc.maxValor.setValue(this.reglasPregunta.maxValor);
    this.fc.retornaA.setValue(this.reglasPregunta.retornaA);
    this.fc.idRetornaA.setValue(this.reglasPregunta.idRetornaA);
  }

  setForm() {
    this.reglasPregunta.tpCondicion = this.fv.tpCondicion;
    this.reglasPregunta.valor = this.fv.valor;
    this.reglasPregunta.minValor = this.fv.minValor;
    this.reglasPregunta.maxValor = this.fv.maxValor;
    this.reglasPregunta.retornaA = this.fv.retornaA;
    this.reglasPregunta.idRetornaA = this.fv.idRetornaA;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      console.log(this.add);
      if (this.edit) {
        this.setForm();
        this.reglasPreguntaService.save(this.reglasPregunta).subscribe(
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
              this.router.navigate(['/backoffice', 'reglasPregunta', 'list', this.idPregun]);
            });
          });
      }

      if (this.add) {
        this.reglasPregunta = new ReglasPregunta();
        this.reglasPregunta.idPregunta = this.id;
        this.setForm();
        this.reglasPreguntaService.insert(this.reglasPregunta).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'reglasPregunta', 'list', this.idPregun]);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'reglasPregunta', 'list', this.idPregun]);
            });
          });
      }
    }
    if (this.delete) {
      this.reglasPreguntaService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'reglasPregunta', 'list', this.idPregun]);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'reglasPregunta', 'list', this.idPregun]);
          });
        }
      );
    }


  }
}

