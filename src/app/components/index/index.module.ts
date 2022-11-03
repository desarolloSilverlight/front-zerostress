import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from '../../core/modules/angular-material.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { IndexRoutingModule } from './index-routing.module';
import { RpasswordComponent } from './rpassword/rpassword.component';
import { ModalTerminosComponent } from './modal-terminos/modal-terminos.component';

@NgModule({
  declarations: [LoginComponent, RegistroComponent, RpasswordComponent, ModalTerminosComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    AngularMaterialModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class IndexModule {
}
