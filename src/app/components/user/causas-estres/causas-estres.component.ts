import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GruposDiagnostico} from 'src/app/core/models/GruposDiagnostico';
import {GruposDiagnosticoService} from 'src/app/core/services/gruposDiagnostico.service';
import {ParametrosService} from 'src/app/core/services/parametros.service';
import Swal from 'sweetalert2';
import {GlobalsUser} from '../../../core/globals/globalsUser';

@Component({
  selector: 'app-causas-estres',
  templateUrl: './causas-estres.component.html',
  styleUrls: ['./causas-estres.component.css']
})
export class CausasEstresComponent implements OnInit {

  causa: GruposDiagnostico[] = [];
  validar = false;
  activate: number;
  id: number;
  eleccion: number;
  img = '../../../../assets/image/Raster';
  ruta = 'ruta';

  constructor(private parametroService: ParametrosService, private actRoute: ActivatedRoute,
              private gruposDiagnosticoService: GruposDiagnosticoService, private router: Router, public globals: GlobalsUser) {
    this.actRoute.params.subscribe(params => {
      this.id = params.id;
      this.parametroService.get(this.id).subscribe(resp => {
        this.ruta = resp.descripcion;
      });
    });

  }

  ngOnInit(): void {
    const grupo = new GruposDiagnostico();
    grupo.idtpEstres = this.id;
    this.gruposDiagnosticoService.list(grupo).toPromise().then(resp => {
      this.causa = resp;
      if(this.globals.causa!=null){
        setTimeout(() => {
          const buttonB = document.getElementById(String(this.globals.causa));
          buttonB.click();
        }, 500);
      }
    });
  }

  cambioApariencia(id: number) {
    let rut: string;
    this.validar = true;
    this.eleccion = id;
    this.causa.forEach(element => {
      if (element.id != id) {
        const buttonB = document.getElementById(String(element.id)) as HTMLButtonElement;
        buttonB.setAttribute('class', 'btn-tab');
        const divB = document.getElementById(String(element.descripcion)) as HTMLDivElement;
        divB.setAttribute('class', 'content-elemts');
      } else {
        rut = ' / ' + element.descripcion2;
        const button = document.getElementById(String(id)) as HTMLButtonElement;
        const div = document.getElementById(String(element.descripcion)) as HTMLDivElement;
        div.setAttribute('class', 'content-elemts-cambio');
        button.setAttribute('class', 'btn-tab-cambio');
        this.activate = id;
      }
    });
    const rutas = this.ruta.split('/');
    if (rutas.length > 1) {
      this.ruta = rutas[0];
    }
    this.ruta += rut;
    this.globals.ruta = this.ruta;
  }

  next() {
    console.log(this.globals.ruta);
    if (this.validar) {
      this.globals.causa=this.eleccion;
      this.router.navigateByUrl('app/temas/' + String(this.eleccion));
    }else{
      Swal.fire({
        title: 'ERROR',
        icon: 'error',
        text: 'Debe escoger al menos una opción'
      });
    }
  }

  peticion(activar:boolean){
    if(activar){
      this.next();
    }
  }
}
