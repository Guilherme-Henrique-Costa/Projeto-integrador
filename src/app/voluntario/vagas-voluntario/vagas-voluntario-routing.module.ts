import { VagasVoluntarioComponent } from './vagas-voluntario.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinhasVagasComponent } from './minhas-vagas/minhas-vagas.component';
import { HistoricoComponent } from './historico/historico.component';

const routes: Routes = [
  {
    path: '',
    component: VagasVoluntarioComponent,
    children: [
      { path: 'minhas-vagas', component: MinhasVagasComponent },
      { path: 'historico', component: HistoricoComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VagasVoluntarioRoutingModule { }
