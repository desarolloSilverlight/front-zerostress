import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListSbCausasEstresComponent} from './list/list-sbCausasEstres.component';
import {EditSbCausasEstresComponent} from './edit/edit-sbCausasEstres.component';

const routes: Routes = [
  {
    path: '',
    component: ListSbCausasEstresComponent
  },
  {
    path: 'list/:parent',
    component: ListSbCausasEstresComponent
  },
  {
    path: 'edit/:type',
    component: EditSbCausasEstresComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditSbCausasEstresComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SbCausasEstresRoutingModule {
}