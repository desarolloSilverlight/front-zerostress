import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-finalizacion',
  templateUrl: './modal-finalizacion.component.html',
  styleUrls: ['./modal-finalizacion.component.css']
})
export class ModalFinalizacionComponent implements OnInit {

  constructor(private dialogReff: MatDialogRef<ModalFinalizacionComponent>) { }

  ngOnInit(): void {
  }

  onClickNO(): void {
    this.dialogReff.close();
}
} 
