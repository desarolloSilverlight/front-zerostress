import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListUsuariosComponent} from './list/list-usuarios.component';
import {EditUsuariosComponent} from './edit/edit-usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: ListUsuariosComponent
  },
  {
    path: 'list/:parent',
    component: ListUsuariosComponent
  },
  {
    path: 'edit/:type',
    component: EditUsuariosComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditUsuariosComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule {
}