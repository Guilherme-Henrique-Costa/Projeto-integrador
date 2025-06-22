import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MensagemComponent } from './mensagem.component';
import { ChatVoluntarioComponent } from '../chat-voluntario/chat-voluntario.component';

const routes: Routes = [
  {
    path: 'mensagens',
    component: MensagemComponent
  },
  {
    path: 'chat/:nome',
    component: ChatVoluntarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MensagemRoutingModule { }
