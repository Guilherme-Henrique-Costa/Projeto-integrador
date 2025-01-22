import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RankingInstituicaoComponent } from './ranking-instituicao.component';

const routes: Routes = [
  {
    path: 'ranking-instituicao',
    component: RankingInstituicaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RankingInstituicaoRoutingModule { }
