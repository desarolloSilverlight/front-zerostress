import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormulariosEmpresasRoutingModule} from './formulariosEmpresas-routing.module';
import {ListFormulariosEmpresasComponent} from './list/list-formulariosEmpresas.component';
import {EditFormulariosEmpresasComponent} from './edit/edit-formulariosEmpresas.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListFormulariosEmpresasComponent, EditFormulariosEmpresasComponent],
  imports: [
    CommonModule,
    FormulariosEmpresasRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class FormulariosEmpresasModule {
}
