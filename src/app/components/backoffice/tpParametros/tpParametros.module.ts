import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TpParametrosRoutingModule} from './tpParametros-routing.module';
import {ListTpParametrosComponent} from './list/list-tpParametros.component';
import {EditTpParametrosComponent} from './edit/edit-tpParametros.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListTpParametrosComponent, EditTpParametrosComponent],
  imports: [
    CommonModule,
    TpParametrosRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class TpParametrosModule {
}
