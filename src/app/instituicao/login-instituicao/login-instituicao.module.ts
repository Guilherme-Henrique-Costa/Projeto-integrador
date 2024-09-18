import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginInstituicaoRoutingModule } from './login-instituicao-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { LoginInstituicaoComponent } from './login-instituicao.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LoginInstituicaoRoutingModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ToastModule,
    DialogModule,
  ]
})
export class LoginInstituicaoModule { }
