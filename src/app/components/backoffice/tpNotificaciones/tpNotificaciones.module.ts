import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TpNotificacionesRoutingModule} from './tpNotificaciones-routing.module';
import {ListTpNotificacionesComponent} from './list/list-tpNotificaciones.component';
import {EditTpNotificacionesComponent} from './edit/edit-tpNotificaciones.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListTpNotificacionesComponent, EditTpNotificacionesComponent],
  imports: [
    CommonModule,
    TpNotificacionesRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class TpNotificacionesModule {
}
