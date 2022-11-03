import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListBaseNotificacionesComponent} from './list/list-baseNotificaciones.component';
import {EditBaseNotificacionesComponent} from './edit/edit-baseNotificaciones.component';

const routes: Routes = [
  {
    path: '',
    component: ListBaseNotificacionesComponent
  },
  {
    path: 'list/:parent',
    component: ListBaseNotificacionesComponent
  },
  {
    path: 'edit/:type',
    component: EditBaseNotificacionesComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditBaseNotificacionesComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseNotificacionesRoutingModule {
}