import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GrupoTrabajoRoutingModule} from './grupoTrabajo-routing.module';
import {ListGrupoTrabajoComponent} from './list/list-grupoTrabajo.component';
import {EditGrupoTrabajoComponent} from './edit/edit-grupoTrabajo.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListGrupoTrabajoComponent, EditGrupoTrabajoComponent],
  imports: [
    CommonModule,
    GrupoTrabajoRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class GrupoTrabajoModule {
}
