import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TP_PARAMETROS} from 'src/app/core/constants/Parametros';
import {Parametros} from 'src/app/core/models/Parametros';
import {ParametrosService} from 'src/app/core/services/parametros.service';
import Swal from 'sweetalert2';
import {GlobalsUser} from "../../../core/globals/globalsUser";

@Component({
  selector: 'app-tp-cerebro',
  templateUrl: './tp-cerebro.component.html',
  styleUrls: ['./tp-cerebro.component.css']
})
export class TpCerebroComponent implements OnInit {

  validar = false;
  eleccion: number;
  activate: number;
  tpEstres: Parametros[] = [];
  img = '../../../../assets/image/Raster';

  constructor(private parametroService: ParametrosService, private router: Router, public globals: GlobalsUser) {
    console.log(globals);
  }

  ngOnInit(): void {
    const tituloElement = document.getElementById('titulo7');
    if (tituloElement) {
        console.log(tituloElement);
        tituloElement.focus();
       // window.location.reload();
    } 

    const param = new Parametros();
    param.idTpParametro = TP_PARAMETROS.TP_CEREBRO;
    this.parametroService.list(param).toPromise().then(resp => {
      this.tpEstres = resp;

      if(this.globals.objReconocimiento.tpCerebero!=null){
        setTimeout(() => {
          console.log(this.globals.tpestres)
          const buttonB = document.getElementById(String(this.globals.objReconocimiento.tpCerebero));
          buttonB.click();
        }, 500);
      }
    });
  }

  cambioApariencia(id: number) {
    this.validar = true;
    this.eleccion = id;
    this.tpEstres.forEach(element => {
      if (element.id != id) {
        const buttonB = document.getElementById(String(element.id)) as HTMLButtonElement;
        buttonB.setAttribute('class', 'btn-tab');
        const divB = document.getElementById(String(element.numerico)) as HTMLDivElement;
        divB.setAttribute('class', 'content-elemts');
      } else {
        const button = document.getElementById(String(id)) as HTMLButtonElement;
        const div = document.getElementById(String(element.numerico)) as HTMLDivElement;
        div.setAttribute('class', 'content-elemts-cambio');
        button.setAttribute('class', 'btn-tab-cambio');
        this.activate = id;
      }
    });

  }

  next() {
    if (this.eleccion !== undefined) {
      this.globals.objReconocimiento.tpCerebero = String(this.eleccion);
      this.router.navigateByUrl('/app/diarioVivir');
    }else{
      Swal.fire({
        title: 'ERROR',
        icon: 'error',
        text: 'Debe seleccionar al menos una opción'
      });
    }

  }

  peticion(activar:boolean){
    if(activar){
      this.next();
    }
  }
}
