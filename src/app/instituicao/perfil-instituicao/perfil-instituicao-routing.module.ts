import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilInstituicaoComponent } from './perfil-instituicao.component';

const routes: Routes = [
  { path: '', component: PerfilInstituicaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilInstituicaoRoutingModule { }
