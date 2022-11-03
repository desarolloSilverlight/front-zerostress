import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RutasReglaRoutingModule} from './rutasRegla-routing.module';
import {ListRutasReglaComponent} from './list/list-rutasRegla.component';
import {EditRutasReglaComponent} from './edit/edit-rutasRegla.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListRutasReglaComponent, EditRutasReglaComponent],
  imports: [
    CommonModule,
    RutasReglaRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class RutasReglaModule {
}
