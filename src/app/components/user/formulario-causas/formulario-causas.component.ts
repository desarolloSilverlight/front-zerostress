import {Component, OnInit} from '@angular/core';
import {ParametrosService} from '../../../core/services/parametros.service';
import {Parametros} from '../../../core/models/Parametros';
import {TP_PARAMETROS} from '../../../core/constants/Parametros';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {SbCausasEstresService} from '../../../core/services/sbCausasEstres.service';
import {SbCausasEstres} from '../../../core/models/SbCausasEstres';
import {TpParametro} from '../../../core/models/TpParametro';
import {TpParametroService} from '../../../core/services/tpParametros.service';
import {UsrCausaEstres} from '../../../core/models/UsrCausaEstres';
import {UsrCausaEstresService} from '../../../core/services/usrCausaEstres.service';
import {ConsultantesService} from '../../../core/services/consultantes.service';
import {GlobalsUser} from '../../../core/globals/globalsUser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-formulario-causas',
  templateUrl: './formulario-causas.component.html',
  styleUrls: ['./formulario-causas.component.css']
})
export class FormularioCausasComponent implements OnInit {
  catEstres: Parametros[] = [];

  formSbCausas = this.fb.group({
    idSbCausa: [null, Validators.required]
  });

  sbCausasEstresList: SbCausasEstres[] = [];
  formPartCuerpo = this.fb.group({
    parts: this.fb.array([])
  });
  formSensaciones = this.fb.group({});

  partesCat: TpParametro[] = [];
  partesCuerpo: Parametros[] = [];
  tpSensaciones: Parametros[] = [];
  tpSensacionesComo: Parametros[] = [];
  partesSelected: Parametros[] = [];

  constructor(private parametrosService: ParametrosService, private fb: FormBuilder, private sbCausasEstresService: SbCausasEstresService,
              private tpParametroService: TpParametroService, private usrCausaEstresService: UsrCausaEstresService,
              private consultantesService: ConsultantesService, private globals: GlobalsUser, private router: Router) {
    this.globals.formularioPrimerIngreso = true;
  }

  ngOnInit(): void {
    const p: Parametros = new Parametros();
    p.idTpParametro = TP_PARAMETROS.TP_CAT_ENERGIA;
    this.parametrosService.list(p).toPromise().then(r => {
      this.catEstres = r;
    });
    this.sbCausasEstresService.list(new SbCausasEstres()).toPromise().then(r => {
      this.sbCausasEstresList = r;
    });
    const formArray = this.formPartCuerpo.get('parts') as FormArray;
    TP_PARAMETROS.TP_PARTES_CUERPO.forEach(id => {
      this.tpParametroService.get(id).toPromise().then(r => {
        this.partesCat.push(r);
      });
      const param = new Parametros();
      param.idTpParametro = id;
      this.parametrosService.list(param).toPromise().then(resp => {
        this.partesCuerpo.push(...resp);
        resp.forEach(re => formArray.push(new FormControl(false)));
      });
    });
    p.idTpParametro = TP_PARAMETROS.TP_SENSACION;
    this.parametrosService.list(p).toPromise().then(r => {
      this.tpSensaciones = r;
    });
    p.idTpParametro = TP_PARAMETROS.TP_SENSACION_COMO;
    this.parametrosService.list(p).toPromise().then(r => {
      this.tpSensacionesComo = r;
    });
  }

  filterCatCausa(idCatCausa: number) {
    return this.sbCausasEstresList.filter(r => r.tpCatCausa === idCatCausa);
  }

  filterPartes(idParteCat: number) {
    return this.partesCuerpo.filter(r => r.idTpParametro === idParteCat);
  }

  changePartes() {
    this.formSensaciones = this.fb.group({});
    this.partesSelected = this.partesCuerpo
      .filter((x, i) => !!this.formPartCuerpo.value.parts[i]);
    this.partesSelected.forEach(x => {
      this.formSensaciones.addControl('part' + x.id, this.fb.array([this.fb.control(null, Validators.required),
        this.fb.control(null, Validators.required), this.fb.control(null, Validators.required)]));
    });
    console.log(this.formSensaciones);
  }

  submit() {
    console.log(this.formSbCausas, this.formPartCuerpo, this.formSensaciones);
    this.partesSelected.forEach(x => {
      const usrCausaEstres = new UsrCausaEstres();
      usrCausaEstres.idSbCausaEstres = this.formSbCausas.value.idSbCausa;
      // usrCausaEstres.idPartCuerpo = x.id;
      const formArray = this.formSensaciones.get(`part${x.id}`) as FormArray;
      // usrCausaEstres.tpSensacion = formArray.at(0).value;
      // usrCausaEstres.idSensacion = formArray.at(1).value;
      // usrCausaEstres.intensidad = formArray.at(2).value;
      usrCausaEstres.idConsultante = this.globals.claimsUser.idConsultante;
      this.usrCausaEstresService.insert(usrCausaEstres).toPromise().then();
    });
    this.consultantesService.get(this.globals.claimsUser.idConsultante).toPromise().then(r => {
      r.primerIngreso = false;
      this.consultantesService.save(r).toPromise().then(() => {
        this.router.navigate(['/app']);
      });
    });
  }
}
