import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

import * as $ from 'jquery';
import {GlobalsUser} from '../../../core/globals/globalsUser';

@Component({
  selector: 'app-progreso-reconocimiento',
  templateUrl: './progreso-reconocimiento.component.html',
  styleUrls: ['./progreso-reconocimiento.component.css']
})
export class ProgresoReconocimientoComponent implements OnInit {

  @Input()
  progress: string;
  @Output()
  next: EventEmitter<any> = new EventEmitter();

  activar = new EventEmitter<boolean>();

  msj: false;
  vuelta: string;
  max = 9;

  constructor(private globals: GlobalsUser, private router: Router) {
  }

  ngOnInit(): void {
    let x: number = Number(this.progress);
    // const pag = this.globals.consultante.primerIngreso ? 9 : 9;
    const pag = 9;
    x = (x * 100) / pag;
    this.max = pag;
    $('.inputRange').css('background', 'linear-gradient(90deg, rgb(132,197,197)' + (x) + '%, rgb(214,214,214)' + (x) + '%)');
    $('.value').html(this.progress + ' de ' + pag + ' completadas');

    if (Number(this.progress) > 1) {
      $('.ca').css('background-color', '#84C5C5');
    }

    if (Number(this.progress) < 9) {
      $('.cc').css('background-color', '#84C5C5');
    }
  }

  volver(): void {

    if (this.progress == '2') {
      this.router.navigateByUrl('app/reconocimiento');
    }
    if (this.progress == '3') {
      this.router.navigateByUrl('app/causasEstres/' + this.globals.tpestres);
    }
    if (this.progress == '4') {
      console.log('ver causa: ', this.globals.causa);
      this.router.navigateByUrl('app/temas/' + this.globals.causa);
    }
    if (this.progress == '5') {
      this.router.navigateByUrl('app/spCausaEstres');
    }
    if (this.progress == '7') {
      this.router.navigateByUrl('app/cuerpo');
    }
    if (this.progress == '8') {
      this.router.navigateByUrl('app/partesCuerpo');
    }
    if (this.progress == '9') {
      this.router.navigateByUrl('app/tpCerebro');
    }
  }

  siguiente() {
    this.next.emit();
  }


}
