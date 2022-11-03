import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {ContenidosService} from '../../../../core/services/contenidos.service';
import {Contenidos} from '../../../../core/models/Contenidos';
import {Preguntas} from '../../../../core/models/Preguntas';
import {ParametrosService} from '../../../../core/services/parametros.service';
import {Parametros} from '../../../../core/models/Parametros';
import {TP_PARAMETROS} from '../../../../core/constants/Parametros';
import {PreguntasService} from '../../../../core/services/preguntas.service';
import {S3ClientService} from '../../../../core/services/s3Client.service';


@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-contenidos.component.html',
  styleUrls: ['./edit-contenidos.component.css']
})
export class EditContenidosComponent implements OnInit {

  id: any;
  type: any;

  edit = false;
  view = false;
  delete = false;
  add = false;
  idForm: number;
  idPregun: number;
  submitted = false;
  preguntas: Preguntas[] = [];


  form: FormGroup = this.fb.group({
    tpContenido: [null, Validators.required],
    link: [null, Validators.required],
    titulo: [null, Validators.required],
    retornaA: [null],
    idRetornaA: [null],
    codigo: [null],
    orden: [null]
  });

  retornaList = [];
  retornasIds = [];
  conten = [];
  tpContenidoList: Parametros[] = [];


  contenidos: Contenidos = new Contenidos();

  constructor(
    private preguntasService: PreguntasService, private parametrosService: ParametrosService,
    private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
    private contenidosService: ContenidosService, private s3ClientService: S3ClientService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  ngOnInit(): void {

    const pre = new Preguntas();
    const p = new Parametros();
    p.idTpParametro = TP_PARAMETROS.TP_RETORNA_A;
    this.parametrosService.list(p).toPromise().then(r => {
      this.retornaList = r;
    });
    p.idTpParametro = TP_PARAMETROS.TP_CONTENIDO;
    this.parametrosService.list(p).toPromise().then(r => {
      this.tpContenidoList = r;
    });

    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      this.contenidosService.get(this.id).toPromise().then(resp => {
        this.contenidos = resp;
        this.idForm = resp.idTemaConsulta;
        this.setInitForm();
      });
    }


    switch (this.type) {
      case 'a':
        this.add = true;
        this.idForm = this.id;
        this.idPregun = this.id;
        pre.id = this.id;
        this.preguntasService.list(pre).toPromise().then(r => {
          this.preguntas = r;
        });
        this.contenidosService.list(new Contenidos()).toPromise().then(resp => {
          this.conten = resp;
          console.log(resp);
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

  csvInputChange(fileInputEvent: any) {
    const files: FileList = fileInputEvent.target.files;
    const fileUpload = files.item(0);
    const formData = new FormData();
    formData.append('file', fileUpload, fileUpload.name);
    this.fc.link.disable();
    this.s3ClientService.upload(formData).subscribe((r: any) => {
      this.fc.link.setValue(r.path);
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

  setInitForm() {
    if (this.contenidos.tpContenido === 3) {
      this.fc.link.disable();
    }

    this.fc.tpContenido.setValue(this.contenidos.tpContenido);
    this.fc.link.setValue(this.contenidos.link);
    this.fc.titulo.setValue(this.contenidos.titulo);
    this.fc.retornaA.setValue(this.contenidos.retornaA);
    this.fc.idRetornaA.setValue(this.contenidos.idRetornaA);
    this.fc.codigo.setValue(this.contenidos.codigo);
    this.fc.orden.setValue(this.contenidos.orden);
  }

  setForm() {
    this.contenidos.tpContenido = this.fv.tpContenido;
    this.contenidos.link = this.fc.link.value;
    this.contenidos.titulo = this.fv.titulo;
    this.contenidos.retornaA = this.fv.retornaA;
    this.contenidos.idRetornaA = this.fv.idRetornaA;
    this.contenidos.codigo = this.fv.codigo;
    this.contenidos.orden = this.fv.orden;
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      if (this.edit) {
        this.setForm();
        console.log(this.form);
        this.contenidosService.save(this.contenidos).subscribe(
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
              this.router.navigate(['/backoffice', 'contenidos', 'list', this.idForm]);
            });
          });
      }

      if (this.add) {
        this.contenidos = new Contenidos();
        this.setForm();
        this.contenidos.idTemaConsulta = this.id;
        this.contenidosService.insert(this.contenidos).subscribe(
          (res) => {
            Swal.fire({
              title: Mensajes.titleSuccess,
              icon: 'success',
              text: Mensajes.textSuccessCreate
            }).then(() => {
              this.router.navigate(['/backoffice', 'contenidos', 'list', this.idForm]);
            });
          },
          (error) => {
            Swal.fire({
              title: Mensajes.titleError,
              icon: 'error',
              text: Mensajes.textErrorCreate,
            }).then(() => {
              this.router.navigate(['/backoffice', 'contenidos', 'list', this.idForm]);
            });
          });
      }
    }
    if (this.delete) {
      this.contenidosService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'contenidos', 'list', this.idForm]);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'contenidos', 'list', this.idForm]);
          });
        }
      );
    }
  }

}
