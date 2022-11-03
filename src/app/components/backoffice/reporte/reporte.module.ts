import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReporteRoutingModule} from './reporte-routing.module';
import {ButtoReporteComponent} from './button/button-reporte.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ButtoReporteComponent],
  imports: [
    CommonModule,
    ReporteRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class ReporteModule {
}
