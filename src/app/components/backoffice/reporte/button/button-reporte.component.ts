import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSelectChange} from '@angular/material/select';
import {General} from '../../../../core/constants/General';
import {ActivatedRoute} from '@angular/router';
import {Notificaciones} from '../../../../core/models/Notificaciones';
import {ReporteService} from '../../../../core/services/reporte.service';
import {CabReportesParamService} from '../../../../core/services/cabReportesParam.service';
import {CabReportesParam} from '../../../../core/models/CabReportesParam';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CabReportesService} from '../../../../core/services/cabReportes.service';
import {CabReportes} from '../../../../core/models/CabReportes';
import { map } from 'rxjs/operators';
import { DateRange } from '@angular/material/datepicker';

@Component({
  selector: 'app-list-notificaciones',
  templateUrl: './button-reporte.component.html',
  styleUrls: ['./button-reporte.component.css']
})
export class ButtoReporteComponent implements OnInit {
  
  id : number
  parametros = []
  llaves=[]
  cabreporte : CabReportes
  titulo="esperando";
  tipoDato : any
  tipoInput:any
  texto_ayuda :any
  reporteOp = []
  submitted = false
  form: FormGroup = this.fb.group({
  });
  constructor(private reporteservice: ReporteService, private actRoute : ActivatedRoute, private fb: FormBuilder,
    private cabReportesParamService: CabReportesParamService, private cabReportes:CabReportesService) {
      this.id=this.actRoute.snapshot.params.id
  }
  campos(): void{
    
  }
  ngOnInit(): void {
    this.cabReportes.get(this.id).subscribe(resp=>{
      this.cabreporte = resp;
      this.titulo = resp.descripcion;
    })
    const nuevo = new CabReportesParam()
    nuevo.idReporte=this.id
    this.cabReportesParamService.list(nuevo).pipe(map(algo=>{
      algo.sort((a,b)=>{
        return a.orden-b.orden
      })
      return algo
    })).toPromise().then(resp => {
      this.parametros=resp;
      resp.forEach(element => {
        const control = this.fb.control('');
        const lon = []
        if(element.requerido){
          lon.push(Validators.required);
        }
        if (element.minimo != undefined){
          //if (element.tpParametro==19){
            //lon.push(Validators.min((element.minimo)));
          //}else{
          lon.push(Validators.min(Number(element.minimo)));
          //}     
        }
        if (element.maximo != undefined){
          lon.push(Validators.max(Number(element.maximo)));
        }
        
        if(element.tpParametro==17){
          this.tipoDato='Numbers'
        }
        if(element.tpParametro==18){
          this.tipoDato='NumbersLetters'
        }
        if(element.tpParametro==19){
          this.tipoInput='date'
        }

        if(element.tpParametro==20){
          this.reporteservice.reporteOp(element.label,element.valor,
            element.nombreTabla).subscribe((resp:any)=>{
              this.reporteOp=resp
            });
        }   
        this.texto_ayuda=element.txAyuda

        control.setValidators(lon)
        let nombre=element.nombre+element.id;
        this.form.addControl(nombre, control);

        });     
      console.log(this.form.controls)
    });

   
  }

  reporte: Array<any>=[];

  Reporte():void{
    this.submitted = true
    if (this.form.valid){
      let strParam = ""

      for (const iterator of this.parametros) {
        strParam += ''+this.form.get(''+iterator.nombre+iterator.id).value+'|*|'
      }

      this.reporteservice.reporte(strParam, this.cabreporte.bdObjecto).subscribe((resp: any)=>{
        console.log(resp)
        this.manejarExcel(resp)
    })
    }
  }

  manejarExcel(response:any):void{
    const dataType=response.type;
    const binary = [];
    binary.push(response);
    const filepath = window.URL.createObjectURL(new Blob(binary,{type:dataType}));
    const descargar = document.createElement('a');
    descargar.href=filepath;
    descargar.setAttribute('download','reporte.xlsx');
    document.body.appendChild(descargar);
    descargar.click();
  }
}
