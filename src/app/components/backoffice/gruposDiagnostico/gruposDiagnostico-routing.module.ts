import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListGruposDiagnosticoComponent} from './list/list-gruposDiagnostico.component';
import {EditGruposDiagnosticoComponent} from './edit/edit-gruposDiagnostico.component';

const routes: Routes = [
  {
    path: '',
    component: ListGruposDiagnosticoComponent
  },
  {
    path: 'list/:parent',
    component: ListGruposDiagnosticoComponent
  },
  {
    path: 'edit/:type',
    component: EditGruposDiagnosticoComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditGruposDiagnosticoComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GruposDiagnosticoRoutingModule {
}