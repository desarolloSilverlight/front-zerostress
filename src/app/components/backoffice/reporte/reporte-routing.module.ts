import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ButtoReporteComponent} from './button/button-reporte.component';

const routes: Routes = [
  {
    path: '',
    component: ButtoReporteComponent
  },
  {
    path: ':id',
    component: ButtoReporteComponent
  },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteRoutingModule {
}