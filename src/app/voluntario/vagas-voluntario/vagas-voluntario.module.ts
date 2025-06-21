import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VagasVoluntarioRoutingModule } from './vagas-voluntario-routing.module';
import { MinhasVagasComponent } from './minhas-vagas/minhas-vagas.component';
import { HistoricoComponent } from './historico/historico.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MinhasVagasComponent,
    HistoricoComponent
  ],
  imports: [
    CommonModule,
    VagasVoluntarioRoutingModule,
    FormsModule,
    RouterModule
  ]
})
export class VagasVoluntarioModule { }
