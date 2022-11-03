import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Formularios} from '../../../core/models/Formularios';
import {FormulariosService} from '../../../core/services/formularios.service';
import {PreguntasService} from '../../../core/services/preguntas.service';
import {Preguntas} from '../../../core/models/Preguntas';
import {Respuestas} from '../../../core/models/Respuestas';
import {RespuestasService} from '../../../core/services/respuestas.service';
import {FormBuilder, Validators} from '@angular/forms';
import {FormulariosGenerados} from '../../../core/models/FormulariosGenerados';
import {GlobalsUser} from '../../../core/globals/globalsUser';
import {FormulariosGeneradosService} from '../../../core/services/formulariosGenerados.service';
import {FlujosFormulariosService} from '../../../core/services/flujosFormularios.service';
import {FlujosFormularios} from '../../../core/models/FlujosFormularios';
import * as $ from 'jquery';
import {ReglasPregunta} from '../../../core/models/ReglasPregunta';
import {ReglasPreguntaService} from '../../../core/services/reglasPregunta.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  idFormulario: number;
  idPregunta: number;
  formulario: Formularios = new Formularios();
  pregunta: Preguntas = new Preguntas();
  respuestas: Respuestas[] = [];
  submited = false;

  form = this.fb.group({
    respuesta: [undefined, Validators.required]
  });

  nIntentBuscarPregunta = 0;

  




  constructor( private actRoute: ActivatedRoute, private formularioService: FormulariosService, private preguntaService: PreguntasService,
              private router: Router, private respuestaService: RespuestasService, private fb: FormBuilder, private globals: GlobalsUser,
              private formularioGeneradoService: FormulariosGeneradosService, private flujoFormularioService: FlujosFormulariosService,
              private reglasPreguntaService: ReglasPreguntaService) {
    document.body.style.backgroundColor = '#9a9a9b14';
    this.actRoute.params.subscribe(params => {
      this.idFormulario = params.id;
      this.idPregunta = params.idPregunta;
      this.formularioService.get(this.idFormulario).toPromise().then(r => {
        this.formulario = r;
        this.globals.formulario = r;
        if (this.idPregunta === undefined) {
          const formularioGen = new FormulariosGenerados();
          formularioGen.idFormulario = this.idFormulario;
          formularioGen.usuario = this.globals.claimsUser.identity;
          formularioGen.fecha = new Date();
          this.formularioGeneradoService.insert(formularioGen).toPromise().then(res => {
            this.globals.formularioGenrado = res;
            console.log("para ver:  ",res)
          });
          const p = new Preguntas();
          p.idFormulario = this.idFormulario;
          p.orden = 1;
          this.preguntaService.list(p).toPromise().then(res => {
            this.router.navigateByUrl('/app/formulario/' + this.idFormulario + '/' + res[0].id);
          });
        }
      });
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    if (this.idPregunta === undefined) {
      return;
    }
    this.preguntaService.get(this.idPregunta).toPromise().then(r => {
      this.pregunta = r;
      const respuesta = new Respuestas();
      respuesta.idPregunta = this.idPregunta;
      this.respuestaService.list(respuesta).toPromise().then(res => {
        this.respuestas = res.sort((a, b) => {
          return a.orden - b.orden;
        });
      });
    });
  }

  submit() {
    this.submited = true;
    if (this.form.valid) {
      const flujoFormulario = new FlujosFormularios();
      if (this.pregunta.tpPregunta === 1) {
        const respuesta: Respuestas = this.form.controls.respuesta.value;
        flujoFormulario.fecha = new Date();
        flujoFormulario.idFormularioGenerador = this.globals.formularioGenrado.id;
        flujoFormulario.idRespuesta = respuesta.id;
        flujoFormulario.idTransaccion = respuesta.retornaA;
        flujoFormulario.puntaje = respuesta.puntaje;
        this.flujoFormularioService.insert(flujoFormulario).toPromise().then();
        if (respuesta.retornaA == null) {
          this.buscarPregunta(this.pregunta.orden + 1);
        } else {
          this.redireccion(respuesta.retornaA, respuesta.idRetornaA);
        }
      } else {
        flujoFormulario.fecha = new Date();
        flujoFormulario.idFormularioGenerador = this.globals.formularioGenrado.id;
        flujoFormulario.puntaje = this.form.controls.respuesta.value;
        this.flujoFormularioService.insert(flujoFormulario).toPromise().then();
        const reglasPregunta = new ReglasPregunta();
        reglasPregunta.idPregunta = this.pregunta.id;
        this.reglasPreguntaService.list(reglasPregunta).toPromise().then(resp => {
          const condicionesIguales = resp.filter(r => r.tpCondicion === '=');
          for (const cond of condicionesIguales) {
            if (flujoFormulario.puntaje === Number(cond.valor)) {
              this.redireccion(cond.retornaA, cond.idRetornaA);
              return;
            }
          }
          const condicionesMenores = resp.filter(r => r.tpCondicion === '<');
          for (const cond of condicionesMenores) {
            if (flujoFormulario.puntaje < Number(cond.valor)) {
              this.redireccion(cond.retornaA, cond.idRetornaA);
              return;
            }
          }
          const condicionesMeyores = resp.filter(r => r.tpCondicion === '>');
          for (const cond of condicionesMeyores) {
            if (flujoFormulario.puntaje > Number(cond.valor)) {
              this.redireccion(cond.retornaA, cond.idRetornaA);
              return;
            }
          }
          this.buscarPregunta(this.pregunta.orden + 1);
        });
      }
    }
  }

  buscarPregunta(orden) {
    const p = new Preguntas();
    p.orden = orden;
    p.idFormulario = this.idFormulario;
    this.preguntaService.list(p).toPromise().then(r => {
      if (r.length === 0 && this.nIntentBuscarPregunta <= 3) {
        this.nIntentBuscarPregunta += 1;
        this.buscarPregunta(orden + 1);
      } else if (r.length === 0 && this.nIntentBuscarPregunta > 3) {
        this.formularioGeneradoService.finish(this.globals.formularioGenrado.id).toPromise().then();
        this.router.navigate(['/app', 'formulario', 'finish', this.idFormulario]);
      } else {
        this.router.navigateByUrl('/app/formulario/' + this.idFormulario + '/' + r[0].id).then();
        this.nIntentBuscarPregunta = 0;
      }
    });
  }

  redireccion(retornaA, idRetornaA) {
    if (retornaA === 1) {
      this.router.navigateByUrl('/app/contenido/' + idRetornaA);
    } else {
      this.router.navigateByUrl('/app/formulario/' + this.idFormulario + '/' + idRetornaA);
    }
  }

}
