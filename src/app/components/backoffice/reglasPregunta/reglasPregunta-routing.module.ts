import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListReglasPreguntaComponent} from './list/list-reglasPregunta.component';
import {EditReglasPreguntaComponent} from './edit/edit-reglasPregunta.component';

const routes: Routes = [
  {
    path: '',
    component: ListReglasPreguntaComponent
  },
  {
    path: 'list/:parent',
    component: ListReglasPreguntaComponent
  },
  {
    path: 'edit/:type',
    component: EditReglasPreguntaComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditReglasPreguntaComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReglasPreguntaRoutingModule {
}