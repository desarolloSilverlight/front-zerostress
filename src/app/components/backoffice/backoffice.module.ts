import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { BackofficeComponent } from './backoffice.component';
import {AngularMaterialModule} from '../../core/modules/angular-material.module';


@NgModule({
  declarations: [BackofficeComponent],
    imports: [
        CommonModule,
        BackofficeRoutingModule,
        AngularMaterialModule
    ]
})
export class BackofficeModule {
}
