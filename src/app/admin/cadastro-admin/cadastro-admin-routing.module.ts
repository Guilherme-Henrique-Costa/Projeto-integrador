import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroAdminComponent } from './cadastro-admin.component';

const routes: Routes = [
  { path: '', component: CadastroAdminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroAdminRoutingModule { }
