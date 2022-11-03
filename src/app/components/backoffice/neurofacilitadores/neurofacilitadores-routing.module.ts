import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListNeurofacilitadorComponent} from './list/list-neurofacilitador.component';
import {EditNeurofacilitadorComponent} from './edit/edit-neurofacilitador.component';

const routes: Routes = [{
  path: '',
  component: ListNeurofacilitadorComponent
},
  {
    path: 'edit/:type',
    component: EditNeurofacilitadorComponent
  },
  {
    path: 'edit/:type/:id',
    component: EditNeurofacilitadorComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NeurofacilitadoresRoutingModule {
}
