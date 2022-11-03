import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-sindatos',
  templateUrl: './modal-sindatos.component.html',
  styleUrls: ['./modal-sindatos.component.css']
})
export class ModalSindatosComponent implements OnInit {

  constructor(private dialogReff: MatDialogRef<ModalSindatosComponent>) { }

  ngOnInit(): void {
  }

  onClickNO(): void {
    this.dialogReff.close();
  }

}
