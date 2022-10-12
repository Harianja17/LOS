import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/component/login/login.component';
import { AdminGuard } from './shared/guard/admin.guard';
import { AuthGuard } from './shared/guard/auth.guard';
import { CustomerGuard } from './shared/guard/customer.guard';
import { LoginGuard } from './shared/guard/login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./costumer-pages/costumer-pages-routing.module').then(m => m.CostumerPagesRoutingModule),
  },
  {
    path: '',
    loadChildren: () => import('./admin-pages/admin-pages-routing.module').then(m => m.AdminPagesRoutingModule),
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule),
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
