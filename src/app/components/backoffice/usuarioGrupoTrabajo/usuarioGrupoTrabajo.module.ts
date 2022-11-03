import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsuarioGrupoTrabajoRoutingModule} from './usuarioGrupoTrabajo-routing.module';
import {ListUsuarioGrupoTrabajoComponent} from './list/list-usuarioGrupoTrabajo.component';
import {EditUsuarioGrupoTrabajoComponent} from './edit/edit-usuarioGrupoTrabajo.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListUsuarioGrupoTrabajoComponent, EditUsuarioGrupoTrabajoComponent],
  imports: [
    CommonModule,
    UsuarioGrupoTrabajoRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class UsuarioGrupoTrabajoModule {
}
