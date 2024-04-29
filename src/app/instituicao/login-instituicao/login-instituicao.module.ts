import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginInstituicaoRoutingModule } from './login-instituicao-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginInstituicaoRoutingModule,
    InputTextModule,
    ButtonModule,
    FormsModule
  ]
})
export class LoginInstituicaoModule { }
