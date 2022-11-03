import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TP_PARAMETROS} from 'src/app/core/constants/Parametros';
import {GlobalsUser} from 'src/app/core/globals/globalsUser';
import {Parametros} from 'src/app/core/models/Parametros';
import {ParametrosService} from 'src/app/core/services/parametros.service';
import {ConsultasService} from "../../../core/services/consultas.service";
import {Consultas} from "../../../core/models/Consultas";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reconocimiento',
  templateUrl: './reconocimiento.component.html',
  styleUrls: ['./reconocimiento.component.css']
})
export class ReconocimientoComponent implements OnInit, AfterViewInit {

  validar = false;
  eleccion: number;
  activate: number;
  tpEstres: Parametros[] = [];
  img = '../../../../assets/image/Raster';

  constructor(private parametroService: ParametrosService, private router: Router, public globals: GlobalsUser,
              private consultaService: ConsultasService) {
    const p = new Consultas();
    p.idConsultante = this.globals.consultante.id;
    p.status = 'P';
    this.consultaService.list(p).toPromise().then(r => {
      if (r.length > 0) {
        Swal.fire({
          icon: 'warning',
          text: 'Ya tienes en curso una actividad'
        }).then(() => {
          this.router.navigateByUrl('/app/misActividades');
        });
      }
    });
  }

  ngOnInit(): void {
    const param = new Parametros();
    param.idTpParametro = TP_PARAMETROS.TP_ESTRES;
    this.parametroService.list(param).toPromise().then(resp => {
      this.tpEstres = resp;
      if (this.globals.tpestres != null) {
        setTimeout(() => {
          console.log(this.globals.tpestres)
          const buttonB = document.getElementById(String(this.globals.tpestres));
          buttonB.click();
        }, 500);
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.globals.tpestres != null) {
      console.log(this.globals.tpestres)
      const buttonB = document.getElementById(String(this.globals.tpestres));
      buttonB.click();
    }
  }

  cambioApariencia(id: number) {
    this.validar = true;
    this.eleccion = id;
    this.tpEstres.forEach(element => {
      if (element.id !== id) {
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
    if (this.validar) {
      this.globals.tpestres = this.eleccion;
      this.router.navigateByUrl('app/causasEstres/' + String(this.eleccion));
    }else{
      Swal.fire({
        title: 'ERROR',
        icon: 'error',
        text: 'Debe escoger al menos una opción'
      });
    }
  }
  Peticion(activar:boolean){
    if(activar){
      this.next();
    }
  }
}
