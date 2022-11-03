import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReportesEmpresaRoutingModule} from './reportesEmpresa-routing.module';
import {ListReportesEmpresaComponent} from './list/list-reportesEmpresa.component';
import {EditReportesEmpresaComponent} from './edit/edit-reportesEmpresa.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListReportesEmpresaComponent, EditReportesEmpresaComponent],
  imports: [
    CommonModule,
    ReportesEmpresaRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class ReportesEmpresaModule {
}
