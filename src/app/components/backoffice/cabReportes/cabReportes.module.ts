import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CabReportesRoutingModule} from './cabReportes-routing.module';
import {ListCabReportesComponent} from './list/list-cabReportes.component';
import {EditCabReportesComponent} from './edit/edit-cabReportes.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListCabReportesComponent, EditCabReportesComponent],
  imports: [
    CommonModule,
    CabReportesRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class CabReportesModule {
}
