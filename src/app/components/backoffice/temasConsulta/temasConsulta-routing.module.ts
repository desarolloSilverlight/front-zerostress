import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListTemasConsultaComponent} from './list/list-temasConsulta.component';
import {EditTemasConsultaComponent} from './edit/edit-temasConsulta.component';

const routes: Routes = [
  {
    path: '',
    component: ListTemasConsultaComponent
  },
  {
    path: 'list/:parent',
    component: ListTemasConsultaComponent
  },
  {
    path: 'edit/:type',
    component: EditTemasConsultaComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditTemasConsultaComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemasConsultaRoutingModule {
}