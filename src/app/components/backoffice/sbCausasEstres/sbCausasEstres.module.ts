import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SbCausasEstresRoutingModule} from './sbCausasEstres-routing.module';
import {ListSbCausasEstresComponent} from './list/list-sbCausasEstres.component';
import {EditSbCausasEstresComponent} from './edit/edit-sbCausasEstres.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListSbCausasEstresComponent, EditSbCausasEstresComponent],
  imports: [
    CommonModule,
    SbCausasEstresRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class SbCausasEstresModule {
}
