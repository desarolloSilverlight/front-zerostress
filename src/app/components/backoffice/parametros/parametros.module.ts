import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ParametrosRoutingModule} from './parametros-routing.module';
import {ListParametrosComponent} from './list/list-parametros.component';
import {EditParametrosComponent} from './edit/edit-parametros.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListParametrosComponent, EditParametrosComponent],
  imports: [
    CommonModule,
    ParametrosRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class ParametrosModule {
}
