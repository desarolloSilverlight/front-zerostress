import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListGrupoTrabajoComponent} from './list/list-grupoTrabajo.component';
import {EditGrupoTrabajoComponent} from './edit/edit-grupoTrabajo.component';

const routes: Routes = [
  {
    path: '',
    component: ListGrupoTrabajoComponent
  },
  {
    path: 'list/:parent',
    component: ListGrupoTrabajoComponent
  },
  {
    path: 'edit/:type',
    component: EditGrupoTrabajoComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditGrupoTrabajoComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoTrabajoRoutingModule {
}