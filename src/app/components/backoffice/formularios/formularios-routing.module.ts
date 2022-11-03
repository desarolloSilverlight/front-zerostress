import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListFormulariosComponent} from './list/list-formularios.component';
import {EditFormulariosComponent} from './edit/edit-formularios.component';

const routes: Routes = [
  {
    path: '',
    component: ListFormulariosComponent
  },
  {
    path: 'list/:parent',
    component: ListFormulariosComponent
  },
  {
    path: 'edit/:type',
    component: EditFormulariosComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditFormulariosComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormulariosRoutingModule {
}