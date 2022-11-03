import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {environment} from 'src/environments/environment';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-modal-terminos',
  templateUrl: './modal-terminos.component.html',
  styleUrls: ['./modal-terminos.component.css']
})
export class ModalTerminosComponent implements OnInit {

  urlTerminos = this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.apiEndpoint}media/terminos.pdf#toolbar=0&navpanes=0&scrollbar=0`);
  heigth = window.innerHeight;

  constructor(private dialogReff: MatDialogRef<ModalTerminosComponent>, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  onClickNO(): void {
    this.dialogReff.close();
  }

}
