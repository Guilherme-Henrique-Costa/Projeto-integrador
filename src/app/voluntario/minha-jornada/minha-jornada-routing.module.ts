import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinhaJornadaComponent } from './minha-jornada.component';

const routes: Routes = [
  {
    path: '',
    component: MinhaJornadaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinhaJornadaRoutingModule { }
