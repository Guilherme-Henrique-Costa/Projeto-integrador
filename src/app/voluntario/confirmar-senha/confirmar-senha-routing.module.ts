import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmarSenhaComponent } from './confirmar-senha.component';

const routes: Routes = [
  {
    path: '',
    component: ConfirmarSenhaComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmarSenhaRoutingModule { }
