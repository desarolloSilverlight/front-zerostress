import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {subscribeOn} from 'rxjs/operators';
import {ModalvideoComponent} from '../modalvideo/modalvideo.component';
import {ModalRecursoComponent} from "../modal-recurso/modal-recurso.component";

@Component({
  selector: 'app-conocimiento',
  templateUrl: './conocimiento.component.html',
  styleUrls: ['./conocimiento.component.css']
})
export class ConocimientoComponent implements OnInit {

  titulos = [

    {
      title: 'Neurociencias'
    },
    {
      title: 'Anti Estres General'
    },
    {
      title: 'Potenciando tu Cerebro'
    }
  ];

  datos = [{
    titulo: 'Capacidad de Cambio',
    conte: 'video',
    video: 'G0 F5  CAPACIDAD DE CAMBIO.mp4',
    tipo: 'VIDEO',
    ruta: 'video.png'
  },
    {
      titulo: 'Orígenes Oriental / Occidental',
      conte: 'G0 D10 .jpg',
      tipo: 'GRÁFICO',
      ruta: 'Grafico.png'
    },
    {
      titulo: 'Cambio desde la mente',
      conte: 'G0 D10b .jpg',
      tipo: 'GRÁFICO',
      ruta: 'Grafico.png'
    },
    {
      titulo: 'Conexión Mente - Cuerpo',
      conte: 'video',
      video: 'G0_F10A_CONEXION_MENTE_CUERPO.mp4',
      tipo: 'VIDEO',
      ruta: 'video.png'
    },
    {
      titulo: 'Causas en la infancia',
      conte: 'video',
      video: 'GO_F10B_EL_PODER_DE_LA_NINEZ.mp4',
      tipo: 'VIDEO',
      ruta: 'video.png'
    }
  ];

  datos1 = [
    {
      titulo: 'Urgencias',
      conte: 'guitarra.png',
      tipo: 'AUDIO',
      ruta: 'audio.png',
      id: 10005
    },
    {
      titulo: 'AONC ',
      conte: 'guitarra.png',
      tipo: 'AUDIO',
      ruta: 'audio.png',
      id: 10006
    },
    {
      titulo: 'Star Trek',
      conte: 'guitarra.png',
      tipo: 'AUDIO',
      ruta: 'audio.png',
      id: 10007
    },
    {
      titulo: 'Bienestar General',
      conte: 'guitarra.png',
      tipo: 'AUDIO',
      ruta: 'audio.png',
      id: 10008
    }
  ];
  datos2 = [
    {
      titulo: 'Smart Relax',
      conte: 'video',
      video: 'G0_F10C_APRENDE_A_RELAJARTE.mp4',
      tipo: 'VIDEO',
      ruta: 'video.png'
    },
    {
      titulo: 'Mejora tu conexión Mente - Cuerpo',
      conte: 'guitarra.png',
      tipo: 'AUDIO',
      ruta: 'audio.png',
      id: 10020
    },
    {
      titulo: 'Mejora tu capacidad de visualizar',
      conte: 'guitarra.png',
      tipo: 'AUDIO',
      ruta: 'audio.png',
      id: 10009
    },
    {
      titulo: 'Observa tu historia',
      conte: 'guitarra.png',
      tipo: 'AUDIO',
      ruta: 'audio.png',
      id: 10010
    }
  ];

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  Actividad(id: number, imagen: string, video: string, titulo: string) {

    const dialogRef = this.dialog.open(ModalRecursoComponent, {
      data: {id, imagen, video, titulo},
      // height: imagen === 'guitarra.png' || video !== undefined ? 'auto' : '90%'
    });
    dialogRef.afterClosed().subscribe(res => {
      this.ngOnInit();
    });
  }

}
