import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Componentes próprios
import { LoginInstituicaoComponent } from './instituicao/login-instituicao/login-instituicao.component';
import { HomeComponent } from './home/home.component';
import { CadastroInstituicaoComponent } from './instituicao/cadastro-instituicao/cadastro-instituicao.component';
import { PoliticaPrivacidadeComponent } from './politica-privacidade/politica-privacidade.component';
import { MenuInstituicaoComponent } from './instituicao/menu-instituicao/menu-instituicao.component';
import { ConfirmarSenhaInstituicaoComponent } from './instituicao/confirmar-senha-instituicao/confirmar-senha-instituicao.component';
import { PerfilInstituicaoComponent } from './instituicao/perfil-instituicao/perfil-instituicao.component';
import { VagasInstituicaoComponent } from './instituicao/vagas-instituicao/vagas-instituicao.component';
import { GestaoInstituicaoComponent } from './instituicao/gestao-instituicao/gestao-instituicao.component';
import { CandidatosComponent } from './instituicao/candidatos/candidatos.component';
import { FeedbackInstituicaoComponent } from './instituicao/feedback-instituicao/feedback-instituicao.component';
import { MensagemInstituicaoComponent } from './instituicao/mensagem-instituicao/mensagem-instituicao.component';
import { RankingInstituicaoComponent } from './instituicao/ranking-instituicao/ranking-instituicao.component';
import { ChatPessoalComponent } from './instituicao/chat-pessoal/chat-pessoal.component';
import { CalendarModule } from 'primeng/calendar';

// Serviços
import { MessageService } from 'primeng/api';
import { LoginService } from './instituicao/login-instituicao/login-instituicao.service';

// PrimeNG Módulos
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenubarModule } from 'primeng/menubar';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { RatingModule } from 'primeng/rating';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CadastroInstituicaoComponent,
    PoliticaPrivacidadeComponent,
    ConfirmarSenhaInstituicaoComponent,
    PerfilInstituicaoComponent,
    VagasInstituicaoComponent,
    GestaoInstituicaoComponent,
    LoginInstituicaoComponent,
    CandidatosComponent,
    FeedbackInstituicaoComponent,
    MensagemInstituicaoComponent,
    RankingInstituicaoComponent,
    ChatPessoalComponent,
    MenuInstituicaoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // PrimeNG Módulos
    InputTextModule,
    ButtonModule,
    PasswordModule,
    InputTextareaModule,
    ToolbarModule,
    ToastModule,
    DialogModule,
    ProgressBarModule,
    CardModule,
    InputMaskModule,
    RadioButtonModule,
    TriStateCheckboxModule,
    MenubarModule,
    CheckboxModule,
    RippleModule,
    SidebarModule,
    RatingModule,
    AccordionModule,
    MultiSelectModule,
    FullCalendarModule,
    CalendarModule,
  ],
  providers: [MessageService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
