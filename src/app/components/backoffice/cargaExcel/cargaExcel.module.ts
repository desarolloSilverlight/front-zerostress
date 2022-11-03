import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CargaExcelRoutingModule} from './cargaExcel-routing.module';
import {CargaComponent} from './carga/carga.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [CargaComponent],
  imports: [
    CommonModule,
    CargaExcelRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class ReporteModule {
}