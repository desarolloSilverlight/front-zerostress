import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalCalificacionComponent} from '../modal-calificacion/modal-calificacion.component';
import {ModalvideoComponent} from '../modalvideo/modalvideo.component';
import {ConsultasService} from '../../../core/services/consultas.service';
import {Consultas} from '../../../core/models/Consultas';
import {GlobalsUser} from '../../../core/globals/globalsUser';
import {ParametrosService} from '../../../core/services/parametros.service';
import {map} from 'rxjs/operators';
import * as $ from 'jquery';
import {FlujoConsultaService} from '../../../core/services/flujoConsulta.service';
import {FlujoConsulta} from '../../../core/models/FlujoConsulta';
import {Contenidos} from "../../../core/models/Contenidos";
import Swal from "sweetalert2";
import {TemasConsultaService} from "../../../core/services/temasConsulta.service";

@Component({
  selector: 'app-mis-actividades',
  templateUrl: './mi-historia.component.html',
  styleUrls: ['./mi-historia.component.css']
})
export class MiHistoriaComponent implements OnInit, AfterViewInit {

  consultas: Consultas[] = [];
  tpEstres = {145: '', 146: '', 147: ''};

  constructor(private dialog: MatDialog, private consultaService: ConsultasService, private globals: GlobalsUser,
              private parametroService: ParametrosService, private flujoConsultaService: FlujoConsultaService,
              private temaService: TemasConsultaService) {
  }

  ngOnInit(): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere Por favor'
    });
    Swal.showLoading();
    Object.keys(this.tpEstres).forEach(p => {
      this.parametroService.get(p).toPromise().then(r => {
        this.tpEstres[p] = r.descripcion;
      });
    });
    const consulta = new Consultas();
    consulta.idConsultante = this.globals.consultante.id;
    this.consultaService.listVi(consulta).pipe(map(m => {
      for (const s of m) {
        s.tema.grupo.ruta = `${this.tpEstres[s.tema.grupo.idtpEstres]} / ${s.tema.grupo.descripcion2}`;
        // const contenidos = Object.assign([], s.contenidos);
        // for (let i = 0; i < s.tema.nRepeticiones - 1; i++) {
        //   s.contenidos.push(...contenidos);
        // }
        s.contenidos.sort((a, b) => a.orden - b.orden);
        if (s.status === 'F') {
          const faltantes = s.total - s.contestadas;
          s.total = s.contestadas;
          for (let i = 0; i < faltantes; i++) {
            s.contenidos.pop();
          }
        }
      }
      m = m.filter(t => t.status === 'F');
      return m;
    })).toPromise().then(resp => {
      Swal.close();
      this.consultas = resp;
      setTimeout(() => {
        this.consultas.forEach(con => {
          const flujoConsulta = new FlujoConsulta();
          flujoConsulta.idConsulta = con.id;
          this.flujoConsultaService.list(flujoConsulta).toPromise().then(r => {
            con.flujos = r;
            setTimeout(() => {
              r.forEach((rs) => this.scrollRigth(con.id));
            }, 100);
          });

          let x: number = con.contestadas;
          x = (x * 100) / con.total;
          $('.inputRange' + con.id).css('background', 'linear-gradient(90deg, rgb(132,197,197)' + (x) + '%, rgb(214,214,214)' + (x) + '%)');
        });
      }, 100);
    }).catch(reason => {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        text: 'Error cargando tus actividades'
      });
    });
  }

  Actividad(id: number, flujo: FlujoConsulta, posicion: number, contenidos: Contenidos[], idConsulta: number) {
    // if (!flujo) {


    const imagen = 'guitarra.png';
    contenidos.filter(s => s.idTemaConsulta === null).forEach(m => {
      m.idTemaConsulta = contenidos.filter(s => s.idTemaConsulta !== null)[0].idTemaConsulta;
    });
    const c = contenidos.find(s => s.id === id);
    const dialogRef = this.dialog.open(ModalvideoComponent, {
      data: {
        id,
        imagen,
        flujo,
        posicion,
        contenidos,
        idConsulta
      },
      width: c.tpContenido === 4 ? '80%' : '60%'
    });
    dialogRef.afterClosed().subscribe(res => {
      this.ngOnInit();
    });
    // }
  }

  OpenDialogC(): void {
    const dialogRef = this.dialog.open(ModalCalificacionComponent, {width: '670px'});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

  scrollLeft(id) {
    const act = $('.actividades-scroll-' + id);
    act.scrollLeft(act.scrollLeft() - 300);
  }

  scrollRigth(id) {
    const act = $('.actividades-scroll-' + id);
    act.scrollLeft(act.scrollLeft() + 300);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.consultas.forEach(con => {
        let x: number = con.contestadas;
        x = (x * 100) / con.total;
        const range = $('.inputRange' + con.id);
        range.css('background', 'linear-gradient(90deg, rgb(132,197,197)' + (x) + '%, rgb(214,214,214)' + (x) + '%)');
        console.log(range);
      });
    });

  }
}
