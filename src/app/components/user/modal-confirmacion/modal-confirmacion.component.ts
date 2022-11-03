import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css']
})
export class ModalConfirmacionComponent implements OnInit {

  constructor(private dialogReff: MatDialogRef<ModalConfirmacionComponent>) { }

  ngOnInit(): void {
  }

  onClickNO(): void {
      this.dialogReff.close();
  }

}
