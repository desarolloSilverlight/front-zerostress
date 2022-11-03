import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListUsrCausaEstresComponent} from './list/list-usrCausaEstres.component';
import {EditUsrCausaEstresComponent} from './edit/edit-usrCausaEstres.component';

const routes: Routes = [
  {
    path: '',
    component: ListUsrCausaEstresComponent
  },
  {
    path: 'list/:parent',
    component: ListUsrCausaEstresComponent
  },
  {
    path: 'edit/:type',
    component: EditUsrCausaEstresComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditUsrCausaEstresComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsrCausaEstresRoutingModule {
}