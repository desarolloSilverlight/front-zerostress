import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListModulosComponent} from './list/list-modulos.component';
import {EditModulosComponent} from './edit/edit-modulos.component';

const routes: Routes = [
  {
    path: '',
    component: ListModulosComponent
  },
  {
    path: 'edit/:type',
    component: EditModulosComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditModulosComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulosRoutingModule {
}
