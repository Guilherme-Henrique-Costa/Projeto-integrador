import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './voluntario/login/login.component';
import { CadastroComponent } from './voluntario/cadastro/cadastro.component';
import { HomeComponent } from './home/home/home.component';
import { LoginInstituicaoComponent } from './instituicao/login-instituicao/login-instituicao.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login-instituicao',
    component: LoginInstituicaoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
