import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelatoriosInstituicaoComponent } from './relatorios-instituicao.component';

const routes: Routes = [
  {
    path: 'relatorios-instituicao',
    component: RelatoriosInstituicaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosInstituicaoRoutingModule { }
