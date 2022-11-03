import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RespuestasRoutingModule} from './respuestas-routing.module';
import {ListRespuestasComponent} from './list/list-respuestas.component';
import {EditRespuestasComponent} from './edit/edit-respuestas.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  declarations: [ListRespuestasComponent, EditRespuestasComponent],
  imports: [
    CommonModule,
    RespuestasRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    NgSelectModule
  ]
})
export class RespuestasModule {
}
