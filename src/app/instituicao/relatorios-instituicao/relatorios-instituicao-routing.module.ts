import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelatoriosInstituicaoComponent } from './relatorios-instituicao.component';

const routes: Routes = [
  {
    path: '',
    component: RelatoriosInstituicaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosInstituicaoRoutingModule { }
