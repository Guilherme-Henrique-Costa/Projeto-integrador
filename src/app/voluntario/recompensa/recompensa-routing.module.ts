import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecompensaComponent } from './recompensa.component';

const routes: Routes = [
  {
    path: '',
    component: RecompensaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecompensaRoutingModule { }
