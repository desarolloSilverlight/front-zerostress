import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListRolesComponent} from './list/list-roles.component';
import {EditRolesComponent} from './edit/edit-roles.component';
import {RolesAsocOpcionesComponent} from './roles-asoc-opciones/roles-asoc-opciones.component';

const routes: Routes = [
  {
    path: '',
    component: ListRolesComponent
  },
  {
    path: 'edit/:type',
    component: EditRolesComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditRolesComponent
  },
  {
    path: 'permisos/asoc/:id',
    component: RolesAsocOpcionesComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule {
}
