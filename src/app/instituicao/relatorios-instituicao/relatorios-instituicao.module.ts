import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatoriosInstituicaoRoutingModule } from './relatorios-instituicao-routing.module';
import { FormsModule } from '@angular/forms';
import { RelatoriosInstituicaoComponent } from './relatorios-instituicao.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [RelatoriosInstituicaoComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RelatoriosInstituicaoRoutingModule
  ]
})
export class RelatoriosInstituicaoModule { }
