import { CadastroInstituicaoComponent } from './cadastro-instituicao.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroInstituicaoRoutingModule } from './cadastro-instituicao-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CadastroInstituicaoRoutingModule,
    ReactiveFormsModule,
    ProgressBarModule,
    AccordionModule,
    CheckboxModule,

  ]
})
export class CadastroInstituicaoModule { }
