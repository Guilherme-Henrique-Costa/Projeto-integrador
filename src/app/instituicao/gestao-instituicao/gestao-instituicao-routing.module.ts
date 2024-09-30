import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestaoInstituicaoComponent } from './gestao-instituicao.component';

const routes: Routes = [
  {
    path: '',
    component: GestaoInstituicaoComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestaoInstituicaoRoutingModule { }
