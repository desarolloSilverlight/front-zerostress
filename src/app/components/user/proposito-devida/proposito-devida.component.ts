import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalvideoComponent} from '../modalvideo/modalvideo.component';
import {ModalRecursoComponent} from "../modal-recurso/modal-recurso.component";

@Component({
  selector: 'app-proposito-devida',
  templateUrl: './proposito-devida.component.html',
  styleUrls: ['./proposito-devida.component.css']
})
export class PropositoDevidaComponent implements OnInit {
  titulos = [
    {
      title: 'Para que naciste',
      datos: [
        {
          titulo: 'Video',
          conte: 'video',
          tipo: 'VIDEO',
          video: 'G9 F98  PARA QUE NACISTE.mp4',
        }
      ]
    },
    {
      title: 'Pasión',
      datos: [
        {
          titulo: 'Portada',
          conte: 'G9 D99 .jpg',
          id: undefined,
          tipo: 'GRAFICO',
        },
        {
          titulo: 'Minimed',
          conte: 'guitarra.png',
          id: 10001,
          tipo: 'ACTIVIDAD',
        },
        {
          titulo: 'Práctica',
          conte: 'guitarra.png',
          id: 10002,
          tipo: 'ACTIVIDAD',
        }
      ]
    },
    {
      title: 'Misión',
      datos: [
        {
          titulo: 'Portada',
          conte: 'G9 D100 .jpg',
          tipo: 'GRAFICO',
        },
        {
          titulo: 'Minimed',
          conte: 'guitarra.png',
          id: 10011,
          tipo: 'ACTIVIDAD',
        },
        {
          titulo: 'Práctica',
          conte: 'guitarra.png',
          id: 10011,
          tipo: 'ACTIVIDAD',
        }
      ]
    },
    {
      title: 'Vocación',
      datos: [
        {
          titulo: 'Portada',
          conte: 'G9 D101 .jpg',
          tipo: 'GRAFICO',
        },
        {
          titulo: 'Minimed',
          conte: 'guitarra.png',
          tipo: 'ACTIVIDAD',
          id: 10012
        },
        {
          titulo: 'Práctica',
          conte: 'guitarra.png',
          tipo: 'ACTIVIDAD',
          id: 10016
        }
      ]
    },
    {
      title: 'Profesión',
      datos: [
        {
          titulo: 'Portada',
          conte: 'G9 D102 .jpg',
          tipo: 'GRAFICO',
        },
        {
          titulo: 'Minimed',
          conte: 'guitarra.png',
          tipo: 'ACTIVIDAD',
          id: 10013
        },
        {
          titulo: 'Práctica',
          conte: 'guitarra.png',
          tipo: 'ACTIVIDAD',
          id: 10017
        }
      ]
    },
    {
      title: 'Valores',
      datos: [
        {
          titulo: 'Portada',
          conte: 'G9 D103 .jpg',
          tipo: 'GRAFICO',
        },
        {
          titulo: 'Practica',
          conte: 'guitarra.png',
          tipo: 'ACTIVIDAD',
          id: 10019
        }
      ]
    },
    {
      title: 'Visión',
      datos: [
        {
          titulo: 'Portada',
          conte: 'G9 D104 .jpg',
          tipo: 'GRAFICO',
        },
        {
          titulo: 'Minimed',
          conte: 'guitarra.png',
          tipo: 'ACTIVIDAD',
          id: 10014
        },
        {
          titulo: 'Practica',
          conte: 'guitarra.png',
          tipo: 'ACTIVIDAD',
          id: 10018
        }
      ]
    }
  ];


  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  Actividad(id: number, imagen: string, video: string, titulo: string) {

    const dialogRef = this.dialog.open(ModalRecursoComponent, {data: {id, imagen, video, titulo}});
    dialogRef.afterClosed().subscribe(res => {
      this.ngOnInit();
    });
  }
}
