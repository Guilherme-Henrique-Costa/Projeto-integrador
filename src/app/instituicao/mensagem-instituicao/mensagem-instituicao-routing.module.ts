import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MensagemInstituicaoComponent } from './mensagem-instituicao.component';

const routes: Routes = [
  {
    path: "mensagem-instituicao",
    component: MensagemInstituicaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstituicaoRoutingModule { }
