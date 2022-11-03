import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListReglasFormularioComponent} from './list/list-reglasFormulario.component';
import {EditReglasFormularioComponent} from './edit/edit-reglasFormulario.component';

const routes: Routes = [
  {
    path: '',
    component: ListReglasFormularioComponent
  },
  {
    path: 'list/:parent',
    component: ListReglasFormularioComponent
  },
  {
    path: 'edit/:type',
    component: EditReglasFormularioComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditReglasFormularioComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReglasFormularioRoutingModule {
}