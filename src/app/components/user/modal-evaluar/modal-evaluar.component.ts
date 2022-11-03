import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-evaluar',
  templateUrl: './modal-evaluar.component.html',
  styleUrls: ['./modal-evaluar.component.css']
})
export class ModalEvaluarComponent implements OnInit {

  constructor(private dialogReff: MatDialogRef<ModalEvaluarComponent>, @Inject(MAT_DIALOG_DATA) public data) {
  }

  respuesta: number;
  id = ['b', 't', 'f', 'e'];

  ngOnInit(): void {
  }

  onClickNO(): void {
    this.data.flujoConsulta.calificacion = -1;
    this.dialogReff.close(-1);
  }

  cerrar() {
    this.dialogReff.close(this.respuesta);
  }

  cambioApariencia(id: string, cal: number): void {
    const button = document.getElementById(id) as HTMLButtonElement;
    button.setAttribute('class', 'content-emote-sele');
    this.data.flujoConsulta.calificacion = cal;

    for (let index = 0; index < this.id.length; index++) {
      if (this.id[index].includes(id)) {
        const btn = document.getElementById(id) as HTMLButtonElement;
        btn.setAttribute('class', 'content-emote-sele');
      } else {
        const btn = document.getElementById(this.id[index]) as HTMLButtonElement;
        btn.setAttribute('class', 'content-emote');
      }
    }
  }

}
