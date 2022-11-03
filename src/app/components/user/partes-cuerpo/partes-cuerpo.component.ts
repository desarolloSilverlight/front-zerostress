import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Parametros} from 'src/app/core/models/Parametros';
import {ParametrosService} from 'src/app/core/services/parametros.service';
import Swal from 'sweetalert2';
import {GlobalsUser} from '../../../core/globals/globalsUser';

@Component({
  selector: 'app-partes-cuerpo',
  templateUrl: './partes-cuerpo.component.html',
  styleUrls: ['./partes-cuerpo.component.css']
})
export class PartesCuerpoComponent implements OnInit {
  id: any = [];
  cabeza = [];
  pecho = [];
  abdomen = [];
  piernas = [];
  brazos = [];
  cintura = [];
  elecciones: any = [];
  ids = [];
  param = new Parametros();
  add = false;
  partes = [];

  constructor(private actRoute: ActivatedRoute, private router: Router,
              private parametroService: ParametrosService, public globals: GlobalsUser) {
    console.log(globals);
    // this.actRoute.params.subscribe(params => {
    this.id = this.globals.objReconocimiento.partes;
    for (let index = 0; index < this.id.length; index++) {
      console.log(this.id[index]);
      this.param.idTpParametro = this.id[index];
      console.log('algooo', this.param);
      this.parametroService.list(this.param).toPromise().then(resp => {
        this.partes.push(resp);
        if (this.id[index] == 17) {
          this.cabeza = resp;
        } else if (this.id[index] == 18) {
          this.pecho = resp;
        } else if (this.id[index] == 19) {
          this.brazos = resp;
        } else if (this.id[index] == 20) {
          this.abdomen = resp;
        } else if (this.id[index] == 21) {
          this.cintura = resp;
        } else {
          this.piernas = resp;
        }

        if(index===(this.id.length-1)){
          if(this.globals.objReconocimiento.partesCuerpo.length>0){
            const param: Parametros = new Parametros();
            console.log("tamaño",this.globals.objReconocimiento.partesCuerpo.length)
            for (let i = 0; i < this.globals.objReconocimiento.partesCuerpo.length; i++) {
              console.log("id: ",this.globals.objReconocimiento.partesCuerpo[i]);
              param.id=this.globals.objReconocimiento.partesCuerpo[i];
              this.parametroService.list(param).toPromise().then(res =>{
                const check = document.getElementById(String(res[0].id));
                check.click();
              });
            }
          }
        }
      });
    }
    
    // });
  }

  ngOnInit(): void {
  }

  eleccion(descripcion: string, id: number): void {
    if (this.elecciones.length < 6) {
      const check = document.getElementById(String(id)) as HTMLInputElement;
      console.log();
      if (check.checked) {
        console.log('.....');
        this.elecciones.push(descripcion);
        this.ids.push(id);
        console.log(this.elecciones);
        if (this.elecciones.length == 6) {
          this.add = true;
        }
      } else {
        for (let index = 0; index < this.elecciones.length; index++) {
          if (this.elecciones[index].includes(descripcion)) {
            this.elecciones.splice(index, 1);
            const id = '00' + String(index);
            const div = document.getElementById(id) as HTMLDivElement;
            div.setAttribute('class', 'lista');
            break;
          }

        }
      }
    }
    this.vaciar();
  }

  vaciar(): void {
    for (let index = 0; index < this.elecciones.length; index++) {
      if (this.elecciones[index] != null) {
        const id = '00' + String(index);
        const div = document.getElementById(id) as HTMLDivElement;
        div.setAttribute('class', 'lista-sele');
      }
    }
  }

  Borrar(descripcion: string, pos: number): void {
    this.elecciones.splice(pos, 1);
    this.ids.splice(pos,1);
    const param = new Parametros();
    param.descripcion = descripcion;
    this.parametroService.list(param).toPromise().then(resp => {
      const check = document.getElementById(String(resp[0].id)) as HTMLInputElement;
      check.checked = false;
      this.add = false;
      const id = '00' + String(pos);
      const div = document.getElementById(id) as HTMLDivElement;
      div.setAttribute('class', 'lista');
    });
    this.vaciar();
  }

  posicionar(inicio: number, final: number): void {
    if (this.elecciones[final] != null) {
      const descripcion1 = this.elecciones[inicio];
      const id1 = this.ids[inicio];
      this.elecciones[inicio] = this.elecciones[final];
      this.ids[inicio] = this.ids[final];
      this.elecciones[final] = descripcion1;
      this.ids[final] = id1;
    }
  }
  
  validacion():void{
    for (let index = 0; index < this.partes.length; index++) {
      let pos = index+1;
      this.partes[index].forEach(element => {
        for (let index2 = 0; index2 < this.elecciones.length; index2++) {
          if(this.elecciones[index2] == element.descripcion){
            if(this.veri.length>0){
              if(!this.veri.includes(pos)){
                this.veri.push(pos);
              }
            }else{
              this.veri.push(pos);
            }
          }
        }
      });
    }
  }
  
  veri = [];
  next(): void {
    this.validacion();
    if (this.elecciones.length > 0) {
      if(this.veri.length===this.partes.length){
        this.globals.objReconocimiento.partesCuerpo = this.ids;
        this.router.navigateByUrl('app/tpCerebro');
      }else{
        Swal.fire({
          title: 'ERROR',
          icon: 'error',
          text: 'Debe escoger al menos una opción de cada zona del cuerpo'
        });
      }
    }else{
      Swal.fire({
        title: 'ERROR',
        icon: 'error',
        text: 'Debe escoger al menos una opción de cada zona del cuerpo'
      });
    }
  }

  peticion(activar:boolean){
    if(activar){
      this.next();
    }
  }
}
