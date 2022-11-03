import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContenidosRoutingModule} from './contenidos-routing.module';
import {ListContenidosComponent} from './list/list-contenidos.component';
import {EditContenidosComponent} from './edit/edit-contenidos.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  declarations: [ListContenidosComponent, EditContenidosComponent],
  imports: [
    CommonModule,
    ContenidosRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    NgSelectModule
  ]
})
export class ContenidosModule {
}
