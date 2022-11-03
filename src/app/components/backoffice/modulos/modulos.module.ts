import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModulosRoutingModule} from './modulos-routing.module';
import {ListModulosComponent} from './list/list-modulos.component';
import {EditModulosComponent} from './edit/edit-modulos.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListModulosComponent, EditModulosComponent],
  imports: [
    CommonModule,
    ModulosRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class ModulosModule {
}
