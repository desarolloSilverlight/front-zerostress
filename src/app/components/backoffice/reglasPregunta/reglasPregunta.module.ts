import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReglasPreguntaRoutingModule} from './reglasPregunta-routing.module';
import {ListReglasPreguntaComponent} from './list/list-reglasPregunta.component';
import {EditReglasPreguntaComponent} from './edit/edit-reglasPregunta.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  declarations: [ListReglasPreguntaComponent, EditReglasPreguntaComponent],
  imports: [
    CommonModule,
    ReglasPreguntaRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    NgSelectModule
  ]
})
export class ReglasPreguntaModule {
}
