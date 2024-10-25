import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './voluntario/login/login.component';
import { CadastroComponent } from './voluntario/cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { LoginInstituicaoComponent } from './instituicao/login-instituicao/login-instituicao.component';
import { CadastroInstituicaoComponent } from './instituicao/cadastro-instituicao/cadastro-instituicao.component';
import { PoliticaPrivacidadeComponent } from './politica-privacidade/politica-privacidade.component';
import { MenuComponent } from './voluntario/menu/menu.component';
import { MenuInstituicaoComponent } from './instituicao/menu-instituicao/menu-instituicao.component';
import { ConfirmarSenhaComponent } from './voluntario/confirmar-senha/confirmar-senha.component';
import { CadastroRejeitadoComponent } from './cadastro-rejeitado/cadastro-rejeitado.component';
import { ConfirmarSenhaInstituicaoComponent } from './instituicao/confirmar-senha-instituicao/confirmar-senha-instituicao.component';
import { PerfilInstituicaoComponent } from './instituicao/perfil-instituicao/perfil-instituicao.component';
import { VagasInstituicaoComponent } from './instituicao/vagas-instituicao/vagas-instituicao.component';
import { GestaoInstituicaoComponent } from './instituicao/gestao-instituicao/gestao-instituicao.component';
import { VagasVoluntarioComponent } from './voluntario/vagas-voluntario/vagas-voluntario.component';
import { CandidatosComponent } from './instituicao/candidatos/candidatos.component';
import { PerfilComponent } from './voluntario/perfil/perfil.component';

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
    path: 'perfil',
    component: PerfilComponent
  },

  {
    path: 'menu',
    component: MenuComponent,
  },

  {
    path: 'login-instituicao',
    component: LoginInstituicaoComponent,
  },

  {
    path: 'cadastro-instituicao',
    component: CadastroInstituicaoComponent,
  },

  {
    path: 'politica-privacidade',
    component: PoliticaPrivacidadeComponent,
  },

  {
    path: 'menu-instituicao',
    component: MenuInstituicaoComponent,
  },

  {
    path: 'confirmar-senha',
    component: ConfirmarSenhaComponent,
  },

  {
    path: 'confirmar-senha-instituicao',
    component: ConfirmarSenhaInstituicaoComponent,
  },

  { path: 'cadastro-rejeitado',
    component: CadastroRejeitadoComponent,
  },

  {
    path: 'perfil-instituicao',
    component: PerfilInstituicaoComponent,
  },

  {
    path: 'vagas-instituicao',
    component: VagasInstituicaoComponent,
  },

  {
    path: 'gestao',
    component: GestaoInstituicaoComponent,
  },

  {
    path: 'vagas',
    component: VagasVoluntarioComponent
  },

  {
    path: 'candidatos',
    component: CandidatosComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
