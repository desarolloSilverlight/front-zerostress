import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BaseTpNotificacinesRoutingModule} from './baseTpNotificacines-routing.module';
import {ListBaseTpNotificacinesComponent} from './list/list-baseTpNotificacines.component';
import {EditBaseTpNotificacinesComponent} from './edit/edit-baseTpNotificacines.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListBaseTpNotificacinesComponent, EditBaseTpNotificacinesComponent],
  imports: [
    CommonModule,
    BaseTpNotificacinesRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class BaseTpNotificacinesModule {
}
