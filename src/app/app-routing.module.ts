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
import { CandidatosComponent } from './instituicao/candidatos/candidatos.component';
import { PerfilComponent } from './voluntario/perfil/perfil.component';
import { FeedbackComponent } from './voluntario/feedback/feedback.component';
import { FeedbackInstituicaoComponent } from './instituicao/feedback-instituicao/feedback-instituicao.component';
import { MensagemInstituicaoComponent } from './instituicao/mensagem-instituicao/mensagem-instituicao.component';
import { RankingInstituicaoComponent } from './instituicao/ranking-instituicao/ranking-instituicao.component';
import { RelatoriosInstituicaoComponent } from './instituicao/relatorios-instituicao/relatorios-instituicao.component';
import { ChatPessoalComponent } from './instituicao/chat-pessoal/chat-pessoal.component';
import { AgendaComponent } from './voluntario/agenda/agenda.component';
import { MensagemComponent } from './voluntario/mensagem/mensagem.component';
import { ChatVoluntarioComponent } from './voluntario/chat-voluntario/chat-voluntario.component';

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
    component: PerfilComponent,
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

  { path: 'cadastro-rejeitado', component: CadastroRejeitadoComponent },

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
    loadChildren: () =>
      import('./voluntario/vagas-voluntario/vagas-voluntario.module').then(
        (m) => m.VagasVoluntarioModule
      ),
  },

  {
    path: 'candidatos',
    component: CandidatosComponent,
  },

  {
    path: 'feedback',
    component: FeedbackComponent,
  },

  {
    path: 'feedback-instituicao',
    component: FeedbackInstituicaoComponent,
  },

  {
    path: 'mensagem-instituicao',
    component: MensagemInstituicaoComponent,
  },

  {
    path: 'ranking-instituicao',
    component: RankingInstituicaoComponent,
  },

  {
    path: 'relatorios-instituicao',
    component: RelatoriosInstituicaoComponent,
  },

  {
    path: 'chat-pessoal',
    component: ChatPessoalComponent,
  },

  {
    path: 'mensagem-instituicao/chat/:nome',
    component: ChatPessoalComponent,
  },

  {
    path: 'agenda',
    component: AgendaComponent,
  },

  {
    path: 'mensagens',
    component: MensagemComponent,
  },

  { path: 'mensagens/chat/:nome', component: ChatVoluntarioComponent },

  { path: 'minha-jornada',
    loadChildren: () => import('./voluntario/minha-jornada/minha-jornada.module').then(m => m.MinhaJornadaModule)},

  { path: 'recompensa',
    loadChildren: () => import('./voluntario/recompensa/recompensa.module').then(m => m.RecompensaModule)},

  { path: 'certificados',
    loadChildren: () => import('./voluntario/certificados/certificados.module').then(m => m.CertificadosModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
