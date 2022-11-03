import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmpresasRoutingModule} from './empresas-routing.module';
import {EditEmpresasComponent} from './edit/edit-empresas.component';
import {ListEmpresasComponent} from './list/list-empresas.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [EditEmpresasComponent, ListEmpresasComponent],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class EmpresasModule {
}
