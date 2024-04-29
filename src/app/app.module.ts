import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CadastroComponent } from './voluntario/cadastro/cadastro.component';

// PrimeNG Components
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
import { CadastroRejeitadoComponent } from './cadastro-rejeitado/cadastro-rejeitado.component';
import { CommonModule } from '@angular/common';

import { FormsModule,} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { MenubarModule } from 'primeng/menubar';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    LoginInstituicaoComponent,
    HomeComponent,
    CadastroInstituicaoComponent,
    PoliticaPrivacidadeComponent,
    CadastroRejeitadoComponent,
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
    RippleModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
