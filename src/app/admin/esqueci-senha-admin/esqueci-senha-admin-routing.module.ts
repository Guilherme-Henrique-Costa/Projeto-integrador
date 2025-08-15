import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EsqueciSenhaAdminComponent } from './esqueci-senha-admin.component';

const routes: Routes = [
  { path: '', component: EsqueciSenhaAdminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsqueciSenhaAdminRoutingModule { }
