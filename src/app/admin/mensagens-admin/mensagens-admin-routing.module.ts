import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MensagensAdminComponent } from './mensagens-admin.component';

const routes: Routes = [{
  path: '', component: MensagensAdminComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MensagensAdminRoutingModule { }
