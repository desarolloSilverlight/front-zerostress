import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NotificacionesRoutingModule} from './notificaciones-routing.module';
import {ListNotificacionesComponent} from './list/list-notificaciones.component';
import {EditNotificacionesComponent} from './edit/edit-notificaciones.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListNotificacionesComponent, EditNotificacionesComponent],
  imports: [
    CommonModule,
    NotificacionesRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class NotificacionesModule {
}
