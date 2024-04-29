import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroRejeitadoComponent } from './cadastro-rejeitado.component';

const routes: Routes = [{ path: '', component: CadastroRejeitadoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRejeitadoRoutingModule { }
