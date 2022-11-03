import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListPreguntasComponent} from './list/list-preguntas.component';
import {EditPreguntasComponent} from './edit/edit-preguntas.component';

const routes: Routes = [
  {
    path: '',
    component: ListPreguntasComponent
  },
  {
    path: 'list/:parent',
    component: ListPreguntasComponent
  },
  {
    path: 'edit/:type',
    component: EditPreguntasComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditPreguntasComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreguntasRoutingModule {
}