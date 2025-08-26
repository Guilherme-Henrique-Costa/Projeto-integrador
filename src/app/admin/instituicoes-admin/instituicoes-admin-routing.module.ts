import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstituicoesAdminComponent } from './instituicoes-admin.component';

const routes: Routes = [{
  path: 'instituticoes-admin', component: InstituicoesAdminComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstituicoesAdminRoutingModule { }
