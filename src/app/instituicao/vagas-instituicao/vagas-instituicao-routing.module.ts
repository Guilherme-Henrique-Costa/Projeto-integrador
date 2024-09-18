import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VagasInstituicaoComponent } from './vagas-instituicao.component';

const routes: Routes = [
  {
    path: 'vagas-instituicao',
    component: VagasInstituicaoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VagasInstituicaoRoutingModule { }
