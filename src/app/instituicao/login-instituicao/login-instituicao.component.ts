import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { frases, label, placeholder, Text } from 'src/assets/dicionario';

@Component({
  selector: 'app-login-instituicao',
  templateUrl: './login-instituicao.component.html',
  styleUrls: ['./login-instituicao.component.css'],
  providers: [MessageService]
})
export class LoginInstituicaoComponent {
  email: string = '';
  senha: string = '';

  position = 'center';
  displayPosition = true;

  text = Text;
  placeholder = placeholder;
  frasesAleatorias = frases;
  label = label;

  constructor(
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  login(): void {
    if (this.isEmailValido(this.email) && this.isSenhaValida(this.senha)) {
      this.exibirMensagemSucesso('Login feito com sucesso');
      this.redirecionarPara('/menu-instituicao', 1000);
    } else {
      const erroMensagem = this.getMensagemErro(this.email, this.senha);
      this.exibirMensagemErro(erroMensagem);
    }
  }

  private isEmailValido(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private isSenhaValida(senha: string): boolean {
    return senha.length >= 3;
  }

  private getMensagemErro(email: string, senha: string): string {
    if (!this.isEmailValido(email)) {
      return 'O email inserido é inválido.';
    } else if (!this.isSenhaValida(senha)) {
      return 'A senha precisa ter no mínimo 3 caracteres.';
    }
    return 'Email ou senha inválidos';
  }

  private exibirMensagemSucesso(mensagem: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: mensagem,
      styleClass: 'toast-success'
    });
  }

  private exibirMensagemErro(mensagem: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: mensagem,
      styleClass: 'toast-error'
    });
  }

  private redirecionarPara(rota: string, delay: number = 0): void {
    setTimeout(() => this.router.navigate([rota]), delay);
  }

  cadastrarInstituicao(): void {
    this.redirecionarPara('/cadastro-instituicao');
  }

  voltar(): void {
    this.redirecionarPara('/home');
  }

  redefinirSenha(): void {
    this.redirecionarPara('/confirmar-senha');
  }

  aceitar(): void {
    this.displayPosition = false;
    this.redirecionarPara('/login-instituicao');
  }

  rejeitar(): void {
    this.displayPosition = false;
    this.redirecionarPara('/cadastro-rejeitado');
  }
}
