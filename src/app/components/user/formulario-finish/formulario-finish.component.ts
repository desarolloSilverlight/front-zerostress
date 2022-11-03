import {Component, OnInit} from '@angular/core';
import {FormulariosGeneradosService} from '../../../core/services/formulariosGenerados.service';
import {GlobalsUser} from '../../../core/globals/globalsUser';

@Component({
  selector: 'app-formulario-finish',
  templateUrl: './formulario-finish.component.html',
  styleUrls: ['./formulario-finish.component.css']
})
export class FormularioFinishComponent implements OnInit {

  constructor(private formularioGeneradoService: FormulariosGeneradosService, private globals: GlobalsUser) {
  }

  ngOnInit(): void {

  }

  get formulario() {
    return this.globals.formulario;
  }

}
