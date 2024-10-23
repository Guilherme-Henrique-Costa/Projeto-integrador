import { VagasVoluntarioComponent } from './vagas-voluntario.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'vagas',
    component: VagasVoluntarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VagasVoluntarioRoutingModule { }
