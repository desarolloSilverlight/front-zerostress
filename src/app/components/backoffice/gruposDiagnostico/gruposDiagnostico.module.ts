import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GruposDiagnosticoRoutingModule} from './gruposDiagnostico-routing.module';
import {ListGruposDiagnosticoComponent} from './list/list-gruposDiagnostico.component';
import {EditGruposDiagnosticoComponent} from './edit/edit-gruposDiagnostico.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListGruposDiagnosticoComponent, EditGruposDiagnosticoComponent],
  imports: [
    CommonModule,
    GruposDiagnosticoRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class GruposDiagnosticoModule {
}
