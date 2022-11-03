import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListCabReportesComponent} from './list/list-cabReportes.component';
import {EditCabReportesComponent} from './edit/edit-cabReportes.component';

const routes: Routes = [
  {
    path: '',
    component: ListCabReportesComponent
  },
  {
    path: 'list/:parent',
    component: ListCabReportesComponent
  },
  {
    path: 'edit/:type',
    component: EditCabReportesComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditCabReportesComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabReportesRoutingModule {
}