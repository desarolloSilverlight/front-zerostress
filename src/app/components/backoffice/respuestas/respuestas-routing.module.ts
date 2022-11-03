import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListRespuestasComponent} from './list/list-respuestas.component';
import {EditRespuestasComponent} from './edit/edit-respuestas.component';

const routes: Routes = [
  {
    path: '',
    component: ListRespuestasComponent
  },
  {
    path: 'list/:parent',
    component: ListRespuestasComponent
  },
  {
    path: 'edit/:type',
    component: EditRespuestasComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditRespuestasComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RespuestasRoutingModule {
}