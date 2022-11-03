import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Mensajes} from '../../../../core/constants/Mensajes';
import {CabReportesParamService} from '../../../../core/services/cabReportesParam.service';
import {CabReportesParam} from '../../../../core/models/CabReportesParam';
import {CabReportes} from '../../../../core/models/CabReportes';
import {CabReportesService} from '../../../../core/services/cabReportes.service';
import {Parametros} from '../../../../core/models/Parametros';
import {ParametrosService} from '../../../../core/services/parametros.service';

@Component({
  selector: 'app-edit-modulos',
  templateUrl: './edit-cabReportesParam.component.html',
  styleUrls: ['./edit-cabReportesParam.component.css']
})
export class EditCabReportesParamComponent implements OnInit {

  id: any;
  type: any;
  idreporte : number;

  edit = false;
  view = false;
  delete = false;
  add = false;
  Reportes=[];
  Parametro=[];
  data = [];
  tipoFecha : any;

  submitted = false;

  form: FormGroup = this.fb.group({
    idReporte: [null, Validators.required],
    nombre: [null, Validators.required],
    tpParametro: [null, Validators.required],
    requerido: [null],
    maximo: [null],
    minimo: [null],
    txAyuda: [null, Validators.required],
    nombreTabla: [null],
    orden: [null, Validators.required],
    label:[null],
    valor:[null]
  });

  cabReportesParam: CabReportesParam = new CabReportesParam();

  constructor(private actRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private cabReportesParamService: CabReportesParamService,
              private cabReportesService: CabReportesService, private parametrosService: ParametrosService) {
    this.id = this.actRoute.snapshot.params.id;
    this.type = this.actRoute.snapshot.params.type;
  }

  CambiaraFecha(id : any): void{
    console.log("holaa",id)
    if (id == 19){
      this.tipoFecha='date';
    }else{
      this.tipoFecha='text';
    }
  }

  ngOnInit(): void {
    if (['e', 'd', 'v'].indexOf(this.type) !== -1) {
      const p = new Parametros();
      p.idTpParametro = 5;
      this.parametrosService.list(p).toPromise().then(r => {
        this.Parametro = r;
      });
      this.cabReportesParamService.get(this.id).toPromise().then(resp => {
        this.cabReportesParam = resp;
        this.idreporte = resp.idReporte;
        this.setInitForm();
      });
      this.cabReportesService.list(new CabReportes()).toPromise().then(resp => {
        resp.forEach(element => {
          if (element.id==this.idreporte){
            this.data.push(element);
          }
        });
        this.Reportes = this.data;     
      });
    }
    switch (this.type) {
      case 'a':
        this.add = true;
        this.idreporte = this.id;
        this.cabReportesService.list(new CabReportes()).toPromise().then(resp => {
          resp.forEach(element => {
            if (element.id==this.id){
              this.data.push(element);
            }
          });
          this.Reportes = this.data;     
        });
        const p = new Parametros();
        p.idTpParametro = 5;
        this.parametrosService.list(p).toPromise().then(r => {
          this.Parametro = r
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
    this.fc.idReporte.setValue(Number(this.cabReportesParam.idReporte));
    this.fc.nombre.setValue(this.cabReportesParam.nombre);
    this.fc.tpParametro.setValue(this.cabReportesParam.tpParametro);
    this.fc.requerido.setValue(this.cabReportesParam.requerido);
    this.fc.maximo.setValue(this.cabReportesParam.maximo);
    this.fc.minimo.setValue(this.cabReportesParam.minimo);
    this.fc.txAyuda.setValue(this.cabReportesParam.txAyuda);
    this.fc.nombreTabla.setValue(this.cabReportesParam.nombreTabla);
    this.fc.orden.setValue(this.cabReportesParam.orden);
    this.fc.label.setValue(this.cabReportesParam.label);
    this.fc.valor.setValue(this.cabReportesParam.valor);
  }

  setForm() {
    this.cabReportesParam.idReporte = this.fv.idReporte;
    this.cabReportesParam.nombre = this.fv.nombre;
    this.cabReportesParam.tpParametro = this.fv.tpParametro;
    this.cabReportesParam.requerido = this.fv.requerido;
    this.cabReportesParam.maximo = this.fv.maximo;
    this.cabReportesParam.minimo = this.fv.minimo;
    this.cabReportesParam.txAyuda = this.fv.txAyuda;
    this.cabReportesParam.nombreTabla = this.fv.nombreTabla;
    this.cabReportesParam.orden = this.fv.orden;
    this.cabReportesParam.label = this.fv.label;
    this.cabReportesParam.valor = this.fv.valor;
  }

  save() {
    this.submitted = true;
    let maximo : any
    let minimo : any
    if(this.fv.tpParametro==19){
      maximo = Date.parse(this.fv.maximo);
      minimo = Date.parse(this.fv.minimo);
    }else{
      maximo = this.fv.maximo
      minimo = this.fv.minimo
    }
    if(Number(maximo)>=Number(minimo)){
      if (this.form.valid) {
        if (this.edit) {
          this.setForm();
          this.cabReportesParamService.save(this.cabReportesParam).subscribe(
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
                this.router.navigate(['/backoffice', 'cabReportesParam', 'list',this.idreporte]);
              });
            });
        }  
        if (this.add) {
          console.log("entroooooooo3")
          this.cabReportesParam = new CabReportesParam();
          this.setForm();
          this.cabReportesParamService.insert(this.cabReportesParam).subscribe(
            (res) => {
              Swal.fire({
                title: Mensajes.titleSuccess,
                icon: 'success',
                text: Mensajes.textSuccessCreate
              }).then(() => {
                this.router.navigate(['/backoffice', 'cabReportesParam','list',this.idreporte]);
              });
            },
            (error) => {
              Swal.fire({
                title: Mensajes.titleError,
                icon: 'error',
                text: Mensajes.textErrorCreate,
              }).then(() => {
                this.router.navigate(['/backoffice', 'cabReportesParam','list',this.idreporte]);
              });
            });
        }
      }
    }else{
      Swal.fire({
        title: Mensajes.titleError,
        icon: 'error',
        text: Mensajes.textErrorValores,
      });
    }
    if (this.delete) {
      this.cabReportesParamService.delete(this.id).subscribe(
        (res) => {
          Swal.fire({
            title: Mensajes.titleSuccess,
            icon: 'success',
            text: Mensajes.textSuccessDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'cabReportesParam','list',this.idreporte]);
          });
        },
        (error) => {
          Swal.fire({
            title: Mensajes.titleError,
            icon: 'error',
            text: Mensajes.textErrorDelete
          }).then(() => {
            this.router.navigate(['/backoffice', 'cabReportesParam','list',this.idreporte]);
          });
        }
      );
    }
  }

}
