import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CabReportesParamRoutingModule} from './cabReportesParam-routing.module';
import {ListCabReportesParamComponent} from './list/list-cabReportesParam.component';
import {EditCabReportesParamComponent} from './edit/edit-cabReportesParam.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListCabReportesParamComponent, EditCabReportesParamComponent],
  imports: [
    CommonModule,
    CabReportesParamRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class CabReportesParamModule {
}
