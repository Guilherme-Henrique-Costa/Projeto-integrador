import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginInstituicaoRoutingModule } from './login-instituicao-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { LoginInstituicaoComponent } from './login-instituicao.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from './login-instituicao.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LoginInstituicaoRoutingModule,
    InputTextModule,
    ButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DialogModule,
    RippleModule,
    ToastModule,
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class LoginInstituicaoModule { }
