import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../shared/guard/login.guard';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  {path: 'login', canActivate: [LoginGuard], component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
