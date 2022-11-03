import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormulariosRoutingModule} from './formularios-routing.module';
import {ListFormulariosComponent} from './list/list-formularios.component';
import {EditFormulariosComponent} from './edit/edit-formularios.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListFormulariosComponent, EditFormulariosComponent],
  imports: [
    CommonModule,
    FormulariosRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class FormulariosModule {
}
