import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListUsuarioGrupoTrabajoComponent} from './list/list-usuarioGrupoTrabajo.component';
import {EditUsuarioGrupoTrabajoComponent} from './edit/edit-usuarioGrupoTrabajo.component';

const routes: Routes = [
  {
    path: '',
    component: ListUsuarioGrupoTrabajoComponent
  },
  {
    path: 'list/:parent',
    component: ListUsuarioGrupoTrabajoComponent
  },
  {
    path: 'edit/:type',
    component: EditUsuarioGrupoTrabajoComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditUsuarioGrupoTrabajoComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioGrupoTrabajoRoutingModule {
}