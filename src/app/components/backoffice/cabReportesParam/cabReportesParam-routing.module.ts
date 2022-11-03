import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListCabReportesParamComponent} from './list/list-cabReportesParam.component';
import {EditCabReportesParamComponent} from './edit/edit-cabReportesParam.component';

const routes: Routes = [
  {
    path: '',
    component: ListCabReportesParamComponent
  },
  {
    path: 'list/:parent',
    component: ListCabReportesParamComponent
  },
  {
    path: 'edit/:type',
    component: EditCabReportesParamComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditCabReportesParamComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabReportesParamRoutingModule {
}