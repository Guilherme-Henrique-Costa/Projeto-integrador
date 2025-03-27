import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CadastroComponent } from './voluntario/cadastro/cadastro.component';

// PrimeNG Components
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LoginComponent } from './voluntario/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ToolbarModule } from 'primeng/toolbar';
import { LoginInstituicaoComponent } from './instituicao/login-instituicao/login-instituicao.component';
import { HomeComponent } from './home/home.component';
import { CadastroInstituicaoComponent } from './instituicao/cadastro-instituicao/cadastro-instituicao.component';
import { PoliticaPrivacidadeComponent } from './politica-privacidade/politica-privacidade.component';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { StepsModule } from 'primeng/steps';



import { FormsModule,} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenubarModule } from 'primeng/menubar';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { MenuComponent } from './voluntario/menu/menu.component';
import { MenuInstituicaoComponent } from './instituicao/menu-instituicao/menu-instituicao.component';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmarSenhaComponent } from './voluntario/confirmar-senha/confirmar-senha.component';
import { RatingModule } from 'primeng/rating';
import { MessageService } from 'primeng/api';
import { ConfirmarSenhaInstituicaoComponent } from './instituicao/confirmar-senha-instituicao/confirmar-senha-instituicao.component';
import { PerfilInstituicaoComponent } from './instituicao/perfil-instituicao/perfil-instituicao.component';
import { VagasInstituicaoComponent } from './instituicao/vagas-instituicao/vagas-instituicao.component';
import { GestaoInstituicaoComponent } from './instituicao/gestao-instituicao/gestao-instituicao.component';
import { CalendarModule } from 'primeng/calendar';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './instituicao/login-instituicao/login-instituicao.service';
import { VagasVoluntarioComponent } from './voluntario/vagas-voluntario/vagas-voluntario.component';
import { CandidatosComponent } from './instituicao/candidatos/candidatos.component';
import { PerfilComponent } from './voluntario/perfil/perfil.component';
import { FeedbackComponent } from './voluntario/feedback/feedback.component';
import { FeedbackInstituicaoComponent } from './instituicao/feedback-instituicao/feedback-instituicao.component';
import { MensagemInstituicaoComponent } from './instituicao/mensagem-instituicao/mensagem-instituicao.component';
import { RankingInstituicaoComponent } from './instituicao/ranking-instituicao/ranking-instituicao.component';
import { RelatoriosInstituicaoComponent } from './instituicao/relatorios-instituicao/relatorios-instituicao.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    CadastroInstituicaoComponent,
    PoliticaPrivacidadeComponent,
    MenuComponent,
    MenuInstituicaoComponent,
    ConfirmarSenhaComponent,
    ConfirmarSenhaInstituicaoComponent,
    PerfilInstituicaoComponent,
    VagasInstituicaoComponent,
    GestaoInstituicaoComponent,
    LoginInstituicaoComponent,
    VagasVoluntarioComponent,
    CandidatosComponent,
    PerfilComponent,
    FeedbackComponent,
    FeedbackInstituicaoComponent,
    MensagemInstituicaoComponent,
    RankingInstituicaoComponent,
    RelatoriosInstituicaoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    InputTextareaModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToolbarModule,
    ToastModule,
    DialogModule,
    FormsModule,
    CardModule,
    InputMaskModule,
    RadioButtonModule,
    TriStateCheckboxModule,
    MenubarModule,
    CheckboxModule,
    RippleModule,
    SidebarModule,
    RatingModule,
    HttpClientModule,
    ProgressBarModule,
    CalendarModule,
    AccordionModule,
    MultiSelectModule,
    StepsModule,

  ],
  providers: [MessageService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
