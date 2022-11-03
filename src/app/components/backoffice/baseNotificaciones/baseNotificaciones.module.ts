import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BaseNotificacionesRoutingModule} from './baseNotificaciones-routing.module';
import {ListBaseNotificacionesComponent} from './list/list-baseNotificaciones.component';
import {EditBaseNotificacionesComponent} from './edit/edit-baseNotificaciones.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListBaseNotificacionesComponent, EditBaseNotificacionesComponent],
  imports: [
    CommonModule,
    BaseNotificacionesRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class BaseNotificacionesModule {
}
