import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {GlobalsUser} from '../../../core/globals/globalsUser';
import { CambioDatosComponent } from '../cambio-datos/cambio-datos.component';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.component.html',
  styleUrls: ['./cuerpo.component.css']
})
export class CuerpoComponent implements OnInit, AfterViewInit {

  partes = [17, 18, 19, 20, 21, 22];
  select = false;
  marcado = [];
  ids = [];
  valor = '0';
  marcados = {};
  pintada = [];
  intensidad = [];
  inte:number=0;
  areas = {
    cabeza: {
      borde: '0099CC',
      color: '0099CC',
      coors: '163,11,164,12,167,12,168,13,169,13,170,14,171,14,172,15,173,15,179,21,179,22,180,23,180,24,181,25,181,27,182,28,182,30,183,31,183,39,182,40,182,43,181,44,181,47,180,48,180,50,179,51,179,52,178,53,178,54,176,56,176,57,171,62,170,62,169,63,168,63,167,64,166,64,165,65,155,65,154,64,152,64,151,63,149,63,143,57,143,56,142,55,142,54,141,53,141,52,140,51,140,50,139,49,139,48,138,47,138,44,137,43,137,40,136,39,136,31,137,30,137,27,138,26,138,25,139,24,139,23,140,22,140,21,146,15,147,15,148,14,149,14,150,13,151,13,152,12,155,12,156,11'
    },
    pecho: {
      borde: '0099CC',
      color: '0099CC',
      coors: '173,75,174,76,180,76,181,77,184,77,185,78,187,78,188,79,188,118,131,118,131,79,132,78,134,78,135,77,138,77,139,76,145,76,146,75,147,75,149,73,149,72,151,70,151,67,152,68,156,68,157,69,163,69,164,68,167,68,168,67,168,70,169,71,169,72,172,75'
    },
    abdomen: {
      borde: '0099CC',
      color: '0099CC',
      coors: '188,121,188,127,189,128,189,136,190,137,190,149,191,150,191,174,128,174,128,149,129,148,129,136,130,135,130,127,131,126,131,121'
    },
    cintura: {
      borde: '0099CC',
      color: '0099CC',
      coors: '191,178,191,189,190,190,190,202,189,203,189,209,162,209,162,205,161,204,161,199,160,198,159,198,158,199,158,203,157,204,157,209,130,209,130,204,129,203,129,191,128,190,128,178'
    },
    'pierna derecha': {
      borde: '0099CC',
      color: '0099CC',
      coors: '189,212,189,215,188,216,188,231,187,232,187,242,186,243,186,257,185,258,185,269,184,270,184,282,183,283,183,295,184,296,186,296,187,297,189,297,190,298,191,298,192,299,193,299,195,301,195,302,197,304,197,306,198,307,198,308,171,308,171,302,170,301,170,291,169,290,169,280,168,279,168,268,167,267,167,259,166,258,166,247,165,246,165,236,164,235,164,225,163,224,163,213,162,212'
    },
    'pierna izquierda': {
      borde: '0099CC',
      color: '0099CC',
      coors: '157,212,156,213,156,223,155,224,155,234,154,235,154,245,153,246,153,257,152,258,152,266,151,267,151,278,150,279,150,289,149,290,149,300,148,301,148,308,121,308,121,307,122,306,122,304,124,302,124,301,126,299,127,299,128,298,129,298,130,297,132,297,133,296,135,296,136,295,136,285,135,284,135,272,134,271,134,259,133,258,133,244,132,243,132,233,131,232,131,217,130,216,130,212'
    },
    'brazo derecho': {
      borde: '0099CC',
      color: '0099CC',
      coors: '211,123,212,124,212,125,213,126,213,128,214,129,214,130,215,131,215,133,216,134,216,136,217,137,217,138,218,139,218,141,219,142,219,143,220,144,220,146,221,147,221,148,222,149,222,151,223,152,223,154,224,155,224,160,223,161,223,162,220,165,219,165,218,166,213,166,212,165,211,165,208,162,208,161,207,160,207,158,206,157,206,156,205,155,205,153,204,152,204,151,203,150,203,148,202,147,202,146,201,145,201,143,200,142,200,141,199,140,199,138,198,137,198,136,197,135,197,133,196,132,196,131,195,130,195,128,194,127,194,126,193,125,193,123,192,122,192,121,191,120,191,81,192,81,196,85,196,86,198,88,198,89,199,90,199,92,200,93,200,94,201,95,201,97,202,98,202,99,203,100,203,102,204,103,204,105,205,106,205,107,206,108,206,110,207,111,207,112,208,113,208,115,209,116,209,117,210,118,210,120,211,121'
    },
    'brazo izquierdo': {
      borde: '0099CC',
      color: '0099CC',
      coors: '110,117,110,116,111,115,111,113,112,112,112,111,113,110,113,108,114,107,114,105,115,104,115,103,116,102,116,100,117,99,117,98,118,97,118,95,119,94,119,93,120,92,120,90,121,89,121,88,123,86,123,85,127,81,128,81,128,119,127,120,127,122,126,123,126,124,125,125,125,127,124,128,124,129,123,130,123,132,122,133,122,134,121,135,121,137,120,138,120,140,119,141,119,142,118,143,118,145,117,146,117,147,116,148,116,149,115,150,115,152,114,153,114,154,113,155,113,157,112,158,112,159,111,160,111,162,108,165,107,165,106,166,101,166,100,165,99,165,96,162,96,161,95,160,95,154,96,153,96,152,97,151,97,149,98,148,98,147,99,146,99,144,100,143,100,142,101,141,101,139,102,138,102,136,103,135,103,134,104,133,104,131,105,130,105,129,106,128,106,126,107,125,107,124,108,123,108,121,109,120,109,118'
    }
  };

  constructor(private router: Router, public globals: GlobalsUser) {   
  }

  ngOnInit(): void {
    const tituloElement = document.getElementById('titulo5');
    if (tituloElement) {
        console.log(tituloElement);
        tituloElement.focus();
       // window.location.reload();
    }

    if(this.globals.objReconocimiento.intensidad.length>0){
      for (let index = 0; index < this.globals.partePintada.length; index++) {
        this.mostrar(this.globals.partePintada[index],this.globals.objReconocimiento.partes[index]);
      } 
    }
    
  }

  ngAfterViewInit():void{
    if(this.globals.objReconocimiento.intensidad.length>0){
      for (let index = 0; index < this.globals.objReconocimiento.intensidad.length; index++) {
        let a = 'sli'+this.globals.objReconocimiento.intensidad[index].split(',')[0];
        const slide = document.getElementById(a) as HTMLInputElement
        console.log("slideeee: ",slide) ;
        slide.value = this.globals.objReconocimiento.intensidad[index].split(',')[1];
        this.pintar(this.globals.objReconocimiento.intensidad[index].split(',')[0]);
      }
    }
  }

  tag(id: any) {
    return document.getElementById(id);
  }

  mostrar(que: any, parte: any): void {

    const content = document.getElementById('rango') as HTMLDivElement;
    if (this.tag(que).style.visibility === 'visible') {
      this.tag(que).style.visibility = 'hidden';
      if (que === 'rollover_4') {
        this.tag('rollover_5').style.visibility = 'hidden';
      } else if (que === 'rollover_5') {
        this.tag('rollover_4').style.visibility = 'hidden';
      } else if (que === 'rollover_6') {
        this.tag('rollover_7').style.visibility = 'hidden';
      } else if (que === 'rollover_7') {
        this.tag('rollover_6').style.visibility = 'hidden';
      }
      for (let index = 0; index < this.marcado.length; index++) {
        if (this.marcado[index].includes(this.tag(que).getAttribute('alt'))) {
          this.marcado.splice(index, 1);
          this.ids.splice(index, 1);
          this.pintada.splice(index, 1);
          this.intensidad.splice(index,1);
          break;
        }
      }
    } else {
      if (que === 'rollover_4') {
        this.tag('rollover_5').style.visibility = 'visible';
      } else if (que === 'rollover_5') {
        this.tag('rollover_4').style.visibility = 'visible';
      } else if (que === 'rollover_6') {
        this.tag('rollover_7').style.visibility = 'visible';
      } else if (que === 'rollover_7') {
        this.tag('rollover_6').style.visibility = 'visible';
      }

      this.tag(que).style.visibility = 'visible';
      content.setAttribute('class', 'rango');
      this.marcado.push(this.tag(que).getAttribute('alt'));
      this.ids.push(parte);
      this.pintada.push(que);
      this.select = true;
    }


    this.reacomodarSliders();
    this.sinEleccion(content);

  }

  sinEleccion(content: any): void {
    if (this.marcado.length === 0) {
      content.setAttribute('class', 'rango-dolor');
      this.select = false;
    }
  }

  reacomodarSliders(): void {
    if (this.marcado.length > 3) {
      for (let index = 0; index < this.marcado.length; index++) {
        const sliders = document.getElementById(this.marcado[index]) as HTMLDivElement;
        if (sliders != null) {
          sliders.setAttribute('class', 'sliders2');
        }
      }
    } else {
      for (let index = 0; index < this.marcado.length; index++) {
        const sliders = document.getElementById(this.marcado[index]) as HTMLDivElement;
        if (sliders != null) {
          sliders.setAttribute('class', 'sliders');
        }
      }
    }
  }

  Borrar(valor: string): void {
    console.log('borrando: ', valor);
    const content = document.getElementById('rango') as HTMLDivElement;

    for (let index = 0; index < this.marcado.length; index++) {
      if (this.marcado[index].includes(valor)) {
        this.marcado.splice(index, 1);
        this.ids.splice(index, 1);
        if (this.pintada[index] == 'rollover_4') {
          this.tag('rollover_5').style.visibility = 'hidden';
        } else if (this.pintada[index] == 'rollover_5') {
          this.tag('rollover_4').style.visibility = 'hidden';
        } else if (this.pintada[index] == 'rollover_6') {
          this.tag('rollover_7').style.visibility = 'hidden';
        } else if (this.pintada[index] == 'rollover_7') {
          this.tag('rollover_6').style.visibility = 'hidden';
        }
        document.getElementById(this.pintada[index]).style.visibility = 'hidden';
        this.pintada.splice(index, 1);
        break;
      }
    }
    if (this.marcado.length === 0) {
      content.setAttribute('class', 'rango-dolor');
      this.select = false;
    }
    this.BorrarIntensidad(valor);
  }

  BorrarIntensidad(a:string){
    for (let index = 0; index < this.intensidad.length; index++) {
      if(this.intensidad[index].includes(a)){
        this.intensidad.splice(index,1);
      }
    }
  }

  pintar(a: any): void {
    this.valor = '0';
    console.log("pintando   sli"+a);
    const slide = document.getElementById('sli' + a) as HTMLInputElement;
    const val = document.getElementById('valueS' + a) as HTMLInputElement;

    let x: number = Number(slide.value);
    x = (x * 100) / 10;
    let v = x;
    console.log(x);
    this.marcados[a] = x;
    if (Number(slide.value) >= 5) {
      v = v - 5;
      if (Number(slide.value) === 10) {
        v = v - 3;
      } else if (Number(slide.value) === 7) {
        v = v + 1;
      } else if (Number(slide.value) === 5 || Number(slide.value) === 6) {
        v = v + 3;
      }
    }
    val.style.left = v + '%';
    slide.style.background = 'linear-gradient(90deg, rgb(132,197,197)' + (x) + '%, rgb(214,214,214)' + (x) + '%)';
    this.valor = slide.value;
    val.innerHTML = this.valor;
    slide.style.content = slide.value;
    if(x>0){
      this.SaveIntensidad(a,this.valor);
    }else{
      this.BorrarIntensidad(a);
    }
  }

  SaveIntensidad(a:string,valor:string){
    let existente=false;
    if(this.intensidad.length===0){
      this.intensidad.push(a+","+valor);
    }else{
      for (let index = 0; index < this.intensidad.length; index++) {
        if(this.intensidad[index].includes(a)){
          this.intensidad[index]=a+','+valor;
          existente=true;
          break;
        }
      }
      if(!existente){
        this.intensidad.push(a+','+valor);
      }  
    }
    console.log('arreglo intensidad: ',this.intensidad);
  }

  next(): void {
    if (this.marcado.length > 0) {
      if(this.intensidad.length===this.marcado.length){
        this.globals.objReconocimiento.partes = this.ids;
        this.globals.objReconocimiento.intensidad = this.intensidad;
        this.globals.partePintada=this.pintada;
        this.router.navigateByUrl('app/partesCuerpo');
      }else{
        Swal.fire({
          title: 'ERROR',
          icon: 'error',
          text: 'La intensidad de cada zona del cuerpo debe ser mayor a 0'
        });
      }
    }else{
      Swal.fire({
        title: 'ERROR',
        icon: 'error',
        text: 'Debe seleccionar al menos una zona del cuerpo'
      });
    }
  }

  peticion(activar:boolean){
    if(activar){
      this.next();
    }
  }
}
