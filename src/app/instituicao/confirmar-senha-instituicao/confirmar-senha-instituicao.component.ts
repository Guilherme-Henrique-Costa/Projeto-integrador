import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-confirmar-senha-instituicao',
  templateUrl: './confirmar-senha-instituicao.component.html',
  styleUrls: ['./confirmar-senha-instituicao.component.css'],
  providers: [MessageService]
})
export class ConfirmarSenhaInstituicaoComponent {
  senha: string = '';
  confirmarSenha: string = '';

  constructor(
    private router: Router,
    private messageService: MessageService
  ) {}

  cadastrar(): void {
    if (this.isSenhaValida()) {
      this.exibirMensagemSucesso('Senha confirmada com sucesso');
      this.redirecionarPara('/login-instituicao', 1000);
    } else {
      this.exibirMensagemErro('A senha precisa ter no mínimo 3 caracteres.');
    }
  }

  private isSenhaValida(): boolean {
    return this.senha.length >= 3;
  }

  private exibirMensagemSucesso(detalhe: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: detalhe,
      styleClass: 'toast-success'
    });
  }

  private exibirMensagemErro(detalhe: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: detalhe,
      styleClass: 'toast-error'
    });
  }

  private redirecionarPara(caminho: string, delay: number): void {
    setTimeout(() => this.router.navigate([caminho]), delay);
  }

  voltar(): void {
    this.router.navigate(['/login-instituicao']);
  }
}
