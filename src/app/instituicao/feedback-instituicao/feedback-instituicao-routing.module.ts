import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackInstituicaoComponent } from './feedback-instituicao.component';

const routes: Routes = [
  {
    path: '',
    component: FeedbackInstituicaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackInstituicaoRoutingModule { }
