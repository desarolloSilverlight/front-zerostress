import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListFormulariosConsultanteComponent} from './list/list-formulariosConsultante.component';
import {EditFormulariosConsultanteComponent} from './edit/edit-formulariosConsultante.component';

const routes: Routes = [
  {
    path: '',
    component: ListFormulariosConsultanteComponent
  },
  {
    path: 'list/:parent',
    component: ListFormulariosConsultanteComponent
  },
  {
    path: 'edit/:type',
    component: EditFormulariosConsultanteComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditFormulariosConsultanteComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormulariosConsultanteRoutingModule {
}