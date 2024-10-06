import { CadastroInstituicaoComponent } from './cadastro-instituicao.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroInstituicaoRoutingModule } from './cadastro-instituicao-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CadastroInstituicaoRoutingModule,
    ReactiveFormsModule,
    ProgressBarModule,

  ]
})
export class CadastroInstituicaoModule { }
