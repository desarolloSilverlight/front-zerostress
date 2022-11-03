import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CargaComponent} from './carga/carga.component';

const routes: Routes = [
  {
    path: '',
    component: CargaComponent
  },
  {
    path: ':id',
    component: CargaComponent
  },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargaExcelRoutingModule {
}