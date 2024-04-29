import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginInstituicaoComponent } from './login-instituicao.component';

const routes: Routes = [
  {
    path: '',
    component: LoginInstituicaoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginInstituicaoRoutingModule { }
