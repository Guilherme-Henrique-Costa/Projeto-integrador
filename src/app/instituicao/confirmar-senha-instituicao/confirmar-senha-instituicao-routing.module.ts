import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmarSenhaInstituicaoComponent } from './confirmar-senha-instituicao.component';

const routes: Routes = [
  {
    path: '',
    component: ConfirmarSenhaInstituicaoComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmarSenhaInstituicaoRoutingModule { }
