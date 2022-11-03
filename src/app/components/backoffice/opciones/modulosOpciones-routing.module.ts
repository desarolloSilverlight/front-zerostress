import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListModulosOpcionesComponent} from './list/list-modulosOpciones.component';
import {EditModulosOpcionesComponent} from './edit/edit-modulosOpciones.component';

const routes: Routes = [
  {
    path: '',
    component: ListModulosOpcionesComponent
  },
  {
    path: 'list/:parent',
    component: ListModulosOpcionesComponent
  },
  {
    path: 'edit/:type',
    component: EditModulosOpcionesComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditModulosOpcionesComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulosOpcionesRoutingModule {
}
