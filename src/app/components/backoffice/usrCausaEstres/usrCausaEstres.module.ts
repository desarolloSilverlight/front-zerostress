import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsrCausaEstresRoutingModule} from './usrCausaEstres-routing.module';
import {ListUsrCausaEstresComponent} from './list/list-usrCausaEstres.component';
import {EditUsrCausaEstresComponent} from './edit/edit-usrCausaEstres.component';
import {AngularMaterialModule} from '../../../core/modules/angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';


@NgModule({
  declarations: [ListUsrCausaEstresComponent, EditUsrCausaEstresComponent],
  imports: [
    CommonModule,
    UsrCausaEstresRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class UsrCausaEstresModule {
}
