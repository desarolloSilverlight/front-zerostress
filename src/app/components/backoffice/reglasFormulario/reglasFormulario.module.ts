import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReglasFormularioRoutingModule} from './reglasFormulario-routing.module';
import {ListReglasFormularioComponent} from './list/list-reglasFormulario.component';
import {EditReglasFormularioComponent} from './edit/edit-reglasFormulario.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListReglasFormularioComponent, EditReglasFormularioComponent],
  imports: [
    CommonModule,
    ReglasFormularioRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class ReglasFormularioModule {
}
