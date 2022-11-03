import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListNotificacionesComponent} from './list/list-notificaciones.component';
import {EditNotificacionesComponent} from './edit/edit-notificaciones.component';

const routes: Routes = [
  {
    path: '',
    component: ListNotificacionesComponent
  },
  {
    path: 'list/:parent',
    component: ListNotificacionesComponent
  },
  {
    path: 'edit/:type',
    component: EditNotificacionesComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditNotificacionesComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificacionesRoutingModule {
}