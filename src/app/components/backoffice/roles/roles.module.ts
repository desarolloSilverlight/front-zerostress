import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RolesRoutingModule} from './roles-routing.module';
import {ListRolesComponent} from './list/list-roles.component';
import {EditRolesComponent} from './edit/edit-roles.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';
import {RolesAsocOpcionesComponent} from './roles-asoc-opciones/roles-asoc-opciones.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [ListRolesComponent, EditRolesComponent, RolesAsocOpcionesComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    MatCheckboxModule
  ]
})
export class RolesModule {
}
