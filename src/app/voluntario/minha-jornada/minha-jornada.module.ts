import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinhaJornadaComponent } from './minha-jornada.component';
import { MinhaJornadaRoutingModule } from './minha-jornada-routing.module'; // nome corrigido aqui
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [MinhaJornadaComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MinhaJornadaRoutingModule, // nome corrigido aqui também
    InputTextModule,
    ButtonModule,
  ]
})
export class MinhaJornadaModule { }
