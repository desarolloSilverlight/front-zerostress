import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsuariosRoutingModule} from './usuarios-routing.module';
import {ListUsuariosComponent} from './list/list-usuarios.component';
import {EditUsuariosComponent} from './edit/edit-usuarios.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListUsuariosComponent, EditUsuariosComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class UsuariosModule {
}
