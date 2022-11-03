import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListConsultasComponent} from './list/list-consultas.component';
import {EditConsultasComponent} from './edit/edit-consultas.component';

const routes: Routes = [
  {
    path: '',
    component: ListConsultasComponent
  },
  {
    path: 'list/:parent',
    component: ListConsultasComponent
  },
  {
    path: 'edit/:type',
    component: EditConsultasComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditConsultasComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule {
}