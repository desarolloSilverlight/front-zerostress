import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListContenidosComponent} from './list/list-contenidos.component';
import {EditContenidosComponent} from './edit/edit-contenidos.component';

const routes: Routes = [
  {
    path: '',
    component: ListContenidosComponent
  },
  {
    path: 'list/:parent',
    component: ListContenidosComponent
  },
  {
    path: 'edit/:type',
    component: EditContenidosComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditContenidosComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContenidosRoutingModule {
}