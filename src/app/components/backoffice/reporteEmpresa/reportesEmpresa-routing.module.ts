import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListReportesEmpresaComponent} from './list/list-reportesEmpresa.component';
import {EditReportesEmpresaComponent} from './edit/edit-reportesEmpresa.component';

const routes: Routes = [
  {
    path: '',
    component: ListReportesEmpresaComponent
  },
  {
    path: 'list/:parent',
    component: ListReportesEmpresaComponent
  },
  {
    path: 'edit/:type',
    component: EditReportesEmpresaComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditReportesEmpresaComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesEmpresaRoutingModule {
}