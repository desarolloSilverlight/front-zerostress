import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModulosOpcionesRoutingModule} from './modulosOpciones-routing.module';
import {ListModulosOpcionesComponent} from './list/list-modulosOpciones.component';
import {EditModulosOpcionesComponent} from './edit/edit-modulosOpciones.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListModulosOpcionesComponent, EditModulosOpcionesComponent],
  imports: [
    CommonModule,
    ModulosOpcionesRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class ModulosOpcionesModule {
}
