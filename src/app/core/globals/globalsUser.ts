import {Injectable} from '@angular/core';
import {Claims} from '../models/Claims';
import {FormulariosGenerados} from '../models/FormulariosGenerados';
import {Formularios} from '../models/Formularios';
import {BehaviorSubject} from 'rxjs';
import {Consultas} from '../models/Consultas';
import {TemasConsulta} from '../models/TemasConsulta';
import {Consultantes} from '../models/Consultantes';

export interface ReconocimientoInterface {
  partes: number[];
  spCausas: number[];
  tpCerebero: string;
  dVivir: string;
  partesCuerpo: number[];
  intensidad: string[];
}

@Injectable()
export class GlobalsUser {
  claimsUser: Claims;
  formularioGenrado: FormulariosGenerados;
  formulario: Formularios;
  formularioPrimerIngreso: boolean;
  loadedClaims: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  objReconocimiento: ReconocimientoInterface;
  ruta;
  causa:number;
  partePintada:string[];
  tpestres:number;

  set consultaRes(value: any) {
    sessionStorage.setItem('consultaRes', JSON.stringify(value));
  }

  get consultaRes(): any {
    return JSON.parse(sessionStorage.getItem('consultaRes'));
  }


  set consultante(value: Consultantes) {
    sessionStorage.setItem('consultante', JSON.stringify(value));
  }

  get consultante(): Consultantes {
    return JSON.parse(sessionStorage.getItem('consultante'));
  }

  set consulta(value: Consultas) {
    sessionStorage.setItem('consulta', JSON.stringify(value));
  }

  get consulta(): Consultas {
    return JSON.parse(sessionStorage.getItem('consulta'));
  }

  set temaConsulta(value: TemasConsulta) {
    sessionStorage.setItem('temaConsulta', JSON.stringify(value));
  }

  get temaConsulta(): TemasConsulta {
    return JSON.parse(sessionStorage.getItem('temaConsulta'));
  }

  // set objReconocimiento(value: ReconocimientoInterface){
  //   sessionStorage.setItem('objReconocimiento', JSON.stringify(value));
  // }
  // get objReconocimiento(): ReconocimientoInterface{
  //   return JSON.parse(sessionStorage.getItem('objReconocimiento'));
  // }
}
