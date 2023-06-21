import {Component, OnInit} from '@angular/core';
import {SbCausasEstres} from 'src/app/core/models/SbCausasEstres';
import {SbCausasEstresService} from 'src/app/core/services/sbCausasEstres.service';
import {GlobalsUser} from '../../../core/globals/globalsUser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sp-causas-estres',
  templateUrl: './sp-causas-estres.component.html',
  styleUrls: ['./sp-causas-estres.component.css']
})
export class SpCausasEstresComponent implements OnInit {

  miedo: any = [];
  ira: any = [];
  tristeza: any = [];
  causas: any[];
  elecciones: any = [];
  add = false;
  idsElecciones: number[] = [];

  constructor(private sbCausasEstresService: SbCausasEstresService, public globals: GlobalsUser, private router: Router) {
    console.log(this.globals);
  }

  ngOnInit(): void {
    let inputField: HTMLElement = <HTMLElement>document.getElementById('#focus');
    inputField && inputField.focus();

    this.sbCausasEstresService.listVi(new SbCausasEstres()).toPromise().then(resp => {
      this.causas = resp;
      resp.forEach(element => {
        if (element.tpCausa == 40) {
          this.ira.push(element);
        } else if (element.tpCausa == 43) {
          this.miedo.push(element);
        } else {
          this.tristeza.push(element);
        }
      });
      if(this.globals.objReconocimiento!=undefined){
        console.log(this.globals.objReconocimiento.spCausas);
        const sb: SbCausasEstres = new SbCausasEstres();
        const ca = this.globals.objReconocimiento.spCausas;
        for(let index = 0; index < ca.length; index++) {
          sb.id=Number(ca[index]);
          this.sbCausasEstresService.listVi(sb).toPromise().then(resp=>{
            console.log("aasver: ",resp[0].descripcion, "-",resp[0].id);
            const check = document.getElementById(String(resp[0].id));
            check.click();
            //this.eleccion(resp[0].descripcion, resp[0].id);
          })
        }
      }
    });

    
  }

  eleccion(descripcion: string, id: number): void {
    if (this.elecciones.length < 6) {
      const check = document.getElementById(String(id)) as HTMLInputElement;
      if (check.checked) {
        this.elecciones.push(descripcion);
        this.idsElecciones.push(id);
        console.log(this.elecciones);
        if (this.elecciones.length === 6) {
          this.add = true;
        }
      } else {
        for (let index = 0; index < this.elecciones.length; index++) {
          if (this.elecciones[index].includes(descripcion)) {
            this.elecciones.splice(index, 1);
            this.idsElecciones.splice(index, 1);
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
    this.causas.forEach(element => {
      if (element.descripcion.includes(descripcion)) {
        const check = document.getElementById(String(element.id)) as HTMLInputElement;
        check.checked = false;
        this.add = false;
        this.elecciones.splice(pos, 1);
        this.idsElecciones.splice(pos, 1);
        const id = '00' + String(pos);
        const div = document.getElementById(id) as HTMLDivElement;
        div.setAttribute('class', 'lista');
      }
    });
    this.vaciar();
  }

  posicionar(inicio: number, final: number): void {
    if (this.elecciones[final] != null) {
      const descripcion1 = this.elecciones[inicio];
      const ids1 = this.idsElecciones[inicio];
      this.elecciones[inicio] = this.elecciones[final];
      this.idsElecciones[inicio] = this.idsElecciones[final];

      this.elecciones[final] = descripcion1;
      this.idsElecciones[final] = ids1;
    }
  }

  next(): void {
    console.log(this.idsElecciones);
    if (this.elecciones.length > 0) {
      if (this.globals.objReconocimiento === undefined) {
        this.globals.objReconocimiento = {
          spCausas: this.idsElecciones,
          partes: [],
          tpCerebero: undefined,
          dVivir: undefined,
          partesCuerpo: [],
          intensidad: []
        };
      } else {
        this.globals.objReconocimiento.spCausas = this.idsElecciones;
      }
      this.router.navigateByUrl('/app/cuerpo');
    }
  }

  peticion(activar:boolean){
    if(activar){
      this.next();
    }
  }

}
