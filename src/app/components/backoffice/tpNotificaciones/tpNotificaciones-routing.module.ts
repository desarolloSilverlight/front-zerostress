import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListTpNotificacionesComponent} from './list/list-tpNotificaciones.component';
import {EditTpNotificacionesComponent} from './edit/edit-tpNotificaciones.component';

const routes: Routes = [
  {
    path: '',
    component: ListTpNotificacionesComponent
  },
  {
    path: 'list/:parent',
    component: ListTpNotificacionesComponent
  },
  {
    path: 'edit/:type',
    component: EditTpNotificacionesComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditTpNotificacionesComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TpNotificacionesRoutingModule {
}