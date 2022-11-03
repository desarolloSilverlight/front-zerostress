import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormulariosConsultanteRoutingModule} from './formulariosConsultante-routing.module';
import {ListFormulariosConsultanteComponent} from './list/list-formulariosConsultante.component';
import {EditFormulariosConsultanteComponent} from './edit/edit-formulariosConsultante.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListFormulariosConsultanteComponent, EditFormulariosConsultanteComponent],
  imports: [
    CommonModule,
    FormulariosConsultanteRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class FormulariosConsultanteModule {
}
