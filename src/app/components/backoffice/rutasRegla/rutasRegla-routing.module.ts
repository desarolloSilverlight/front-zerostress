import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListRutasReglaComponent} from './list/list-rutasRegla.component';
import {EditRutasReglaComponent} from './edit/edit-rutasRegla.component';

const routes: Routes = [
  {
    path: '',
    component: ListRutasReglaComponent
  },
  {
    path: 'list/:parent',
    component: ListRutasReglaComponent
  },
  {
    path: 'edit/:type',
    component: EditRutasReglaComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditRutasReglaComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RutasReglaRoutingModule {
}