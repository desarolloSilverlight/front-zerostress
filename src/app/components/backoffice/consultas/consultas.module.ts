import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ConsultasRoutingModule} from './consultas-routing.module';
import {ListConsultasComponent} from './list/list-consultas.component';
import {EditConsultasComponent} from './edit/edit-consultas.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListConsultasComponent, EditConsultasComponent],
  imports: [
    CommonModule,
    ConsultasRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class ConsultasModule {
}
