import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecompensaComponent } from './recompensa.component';
import { RecompensaRoutingModule } from './recompensa-routing.module';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RecompensaComponent],
  imports: [
    CommonModule,
    RecompensaRoutingModule,
    ButtonModule,
    RouterModule
  ]
})
export class RecompensaModule { }
