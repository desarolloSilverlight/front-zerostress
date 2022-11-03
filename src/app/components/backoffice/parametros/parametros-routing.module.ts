import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListParametrosComponent} from './list/list-parametros.component';
import {EditParametrosComponent} from './edit/edit-parametros.component';

const routes: Routes = [
  {
    path: '',
    component: ListParametrosComponent
  },
  {
    path: 'list/:parent',
    component: ListParametrosComponent
  },
  {
    path: 'edit/:type',
    component: EditParametrosComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditParametrosComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule {
}
