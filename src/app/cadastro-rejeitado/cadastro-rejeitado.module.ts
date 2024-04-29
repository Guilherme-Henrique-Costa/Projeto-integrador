import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroRejeitadoRoutingModule } from './cadastro-rejeitado-routing.module';
import { ButtonModule } from 'primeng/button';
import { CadastroRejeitadoComponent } from './cadastro-rejeitado.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CadastroRejeitadoRoutingModule,
    ButtonModule
  ]
})
export class CadastroRejeitadoModule { }
