import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliticaPrivacidadeRoutingModule } from './politica-privacidade-routing.module';
import { PoliticaPrivacidadeComponent } from './politica-privacidade.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PoliticaPrivacidadeRoutingModule,
    ButtonModule,
  ]
})
export class PoliticaPrivacidadeModule { }
