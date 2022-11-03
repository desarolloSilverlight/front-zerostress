import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListTpParametrosComponent} from './list/list-tpParametros.component';
import {EditTpParametrosComponent} from './edit/edit-tpParametros.component';

const routes: Routes = [
  {
    path: '',
    component: ListTpParametrosComponent
  },
  {
    path: 'edit/:type',
    component: EditTpParametrosComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditTpParametrosComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TpParametrosRoutingModule {
}
