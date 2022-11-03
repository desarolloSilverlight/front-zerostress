import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListEmpresasComponent} from './list/list-empresas.component';
import {EditEmpresasComponent} from './edit/edit-empresas.component';

const routes: Routes = [{
  path: '',
  component: ListEmpresasComponent
},
  {
    path: 'edit/:type',
    component: EditEmpresasComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditEmpresasComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresasRoutingModule {
}
