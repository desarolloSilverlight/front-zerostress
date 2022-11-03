import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NeurofacilitadoresRoutingModule} from './neurofacilitadores-routing.module';
import {EditNeurofacilitadorComponent} from './edit/edit-neurofacilitador.component';
import {ListNeurofacilitadorComponent} from './list/list-neurofacilitador.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [EditNeurofacilitadorComponent, ListNeurofacilitadorComponent],
  imports: [
    CommonModule,
    NeurofacilitadoresRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class NeurofacilitadoresModule {
}
