import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListConsultantesComponent} from './list/list-consultantes.component';
import {EditConsultantesComponent} from './edit/edit-consultantes.component';

const routes: Routes = [
  {
    path: '',
    component: ListConsultantesComponent
  },
  {
    path: 'list/:parent',
    component: ListConsultantesComponent
  },
  {
    path: 'edit/:type',
    component: EditConsultantesComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditConsultantesComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultantesRoutingModule {
}
