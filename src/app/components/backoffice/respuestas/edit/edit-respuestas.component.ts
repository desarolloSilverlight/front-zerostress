import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {RespuestasService} from '../../../../core/services/respuestas.service';
import {Respuestas} from '../../../../core/models/Respuestas';
import {ParametrosService} from '../../../../core/services/parametros.service';
import {Parametros} from '../../../../core/models/Parametros';
import {TP_PARAMETROS} from '../../../../core/constants/Parametros';
import {PreguntasService} from '../../../../core/services/preguntas.service';
import {Preguntas} from '../../../../core/models/Preguntas';
import {Contenidos} from '../../../../core/models/Contenidos';
import {ContenidosService} from '../../../../core/services/contenidos.service';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-respuestas.component.html',
  styleUrls: ['./edit-respuestas.component.css']
})
export class EditRespuestasComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;
  idPregun : number

  submitted = false;

  form: FormGroup = this.fb.group({
    descripcion: [null, Validators.required],
    puntaje: [null, Validators.required],
    orden: [null, Validators.required],
    retornaA: [null, Validators.required],
    idRetornaA: [null, Validators.required],
  });

  respuestas: Respuestas = new Respuestas();
  retornaList = [];
  retornasIds = [];
  preguntas: Preguntas[] = [];
  conten : Contenidos[] = []
  constructor(private contenidosService: ContenidosService,private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private respuestasService: RespuestasService, private parametrosService: ParametrosService,
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

    const pre = new Preguntas();
    const cont = new Contenidos();

    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.respuestasService.get(this.id).toPromise().then(resp => {
        this.respuestas = resp;
        this.idPregun = resp.idPregunta
        this.setInitForm();
        this.preguntasService.get(resp.idPregunta).toPromise().then(r => {
          pre.idFormulario = r.idFormulario;
        this.preguntasService.list(pre).toPromise().then(res => {
          this.preguntas = res;
          });
        });
      });
    }

    switch (this.type) {
      case 'a':
        this.add = true;
        this.idPregun=this.id
        pre.id = this.id;
        this.preguntasService.list(pre).toPromise().then(r => {
          this.preguntas = r;
        });
        this.preguntasService.get(this.idPregun).toPromise().then(r => {
          // cont.idFormulario = r.idFormulario
          this.contenidosService.list(cont).toPromise().then(resp => {
          this.conten = resp;
          });
        });
        break;
      case 'e':
        pre.id = this.id;
        this.preguntasService.list(pre).toPromise().then(r => {
          this.preguntas = r;
        });
        this.contenidosService.list(new Contenidos()).toPromise().then(resp => {
        this.conten = resp;
        });
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

  changeRetorna(param: Parametros) {
    if (param.numerico === 2) {
      const arr = [];
      for (const pre of this.preguntas) {
        arr.push({ label: pre.descripcion, value: pre.id });
      }
      console.log(this.preguntas)
      this.retornasIds = arr;
    } else {
      if (param.numerico === 1) {
        const arr = [];
        for (const conten of this.conten) {
          arr.push({ label: conten.titulo, value: conten.id});
        }
        this.retornasIds = arr;
        console.log(this.retornasIds)
      }
    }
  }

  setInitForm() {
    this.fc.descripcion.setValue(this.respuestas.descripcion);
    this.fc.puntaje.setValue(this.respuestas.puntaje);
    this.fc.orden.setValue(this.respuestas.orden);
    this.fc.retornaA.setValue(this.respuestas.retornaA);
    this.fc.idRetornaA.setValue(this.respuestas.idRetornaA);
  }

  setForm() {
    this.respuestas.descripcion = this.fv.descripcion;
    this.respuestas.puntaje = this.fv.puntaje;
    this.respuestas.orden = this.fv.orden;
    this.respuestas.retornaA = this.fv.retornaA;
    this.respuestas.idRetornaA = this.fv.idRetornaA;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        this.respuestasService.save(this.respuestas).subscribe(
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
              this.router.navigate(['/backoffice', 'respuestas']);
            });
          });
      }


      if (this.add) {
        this.respuestas = new Respuestas();
        this.setForm();
        this.respuestas.idPregunta = this.id;
        this.respuestasService.insert(this.respuestas).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'respuestas','list',this.idPregun]);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'respuestas']);
            });
          });
      }
    }
    if (this.delete) {
      this.respuestasService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'respuestas']);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'respuestas']);
          });
        }
      );
    }
  }

}
