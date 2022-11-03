import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ConsultantesRoutingModule} from './consultantes-routing.module';
import {ListConsultantesComponent} from './list/list-consultantes.component';
import {EditConsultantesComponent} from './edit/edit-consultantes.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListConsultantesComponent, EditConsultantesComponent],
  imports: [
    CommonModule,
    ConsultantesRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class ConsultantesModule {
}
