import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PreguntasRoutingModule} from './preguntas-routing.module';
import {ListPreguntasComponent} from './list/list-preguntas.component';
import {EditPreguntasComponent} from './edit/edit-preguntas.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  declarations: [ListPreguntasComponent, EditPreguntasComponent],
    imports: [
        CommonModule,
        PreguntasRoutingModule,
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        NgSelectModule
    ]
})
export class PreguntasModule {
}
