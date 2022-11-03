import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListBaseTpNotificacinesComponent} from './list/list-baseTpNotificacines.component';
import {EditBaseTpNotificacinesComponent} from './edit/edit-baseTpNotificacines.component';

const routes: Routes = [
  {
    path: '',
    component: ListBaseTpNotificacinesComponent
  },
  {
    path: 'list/:parent',
    component: ListBaseTpNotificacinesComponent
  },
  {
    path: 'edit/:type',
    component: EditBaseTpNotificacinesComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditBaseTpNotificacinesComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseTpNotificacinesRoutingModule {
}