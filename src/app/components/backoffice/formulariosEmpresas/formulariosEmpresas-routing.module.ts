import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListFormulariosEmpresasComponent} from './list/list-formulariosEmpresas.component';
import {EditFormulariosEmpresasComponent} from './edit/edit-formulariosEmpresas.component';

const routes: Routes = [
  {
    path: '',
    component: ListFormulariosEmpresasComponent
  },
  {
    path: 'list/:parent',
    component: ListFormulariosEmpresasComponent
  },
  {
    path: 'edit/:type',
    component: EditFormulariosEmpresasComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditFormulariosEmpresasComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormulariosEmpresasRoutingModule {
}