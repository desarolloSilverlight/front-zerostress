import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthUserGuard} from './core/guards/auth-user.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '',
    loadChildren: () => import('./components/index/index.module').then(m => m.IndexModule)
  },
  {
    canActivate: [AuthUserGuard],
    canActivateChild: [AuthUserGuard],
    path: 'app',
    loadChildren: () => import('./components/user/user.module').then(m => m.UserModule),
  },
  {
    canActivate: [AuthUserGuard],
    canActivateChild: [AuthUserGuard],
    path: 'backoffice',
    loadChildren: () => import('./components/backoffice/backoffice.module').then(m => m.BackofficeModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
