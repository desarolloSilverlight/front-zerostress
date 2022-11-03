import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TemasConsultaRoutingModule} from './temasConsulta-routing.module';
import {ListTemasConsultaComponent} from './list/list-temasConsulta.component';
import {EditTemasConsultaComponent} from './edit/edit-temasConsulta.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListTemasConsultaComponent, EditTemasConsultaComponent],
  imports: [
    CommonModule,
    TemasConsultaRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class TemasConsultaModule {
}
