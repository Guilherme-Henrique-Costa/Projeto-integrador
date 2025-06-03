import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService, Instituicao } from './login-instituicao.service';
import { frases, label, placeholder, Text } from 'src/assets/dicionario';
import { HttpErrorResponse } from '@angular/common/http';

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
    private messageService: MessageService,
    private loginService: LoginService // Injetar LoginService
  ) {}

  ngOnInit(): void {}

  // Método de login para autenticar a instituição
  login(): void {
  if (this.isEmailValido(this.email) && this.isSenhaValida(this.senha)) {
    this.loginService.login({ email: this.email, senha: this.senha }).subscribe(
      (token: string) => {
        localStorage.setItem('token', token); // salva o JWT

        this.exibirMensagemSucesso('Login realizado com sucesso.');
        this.redirecionarPara('/menu-instituicao', 1000);
      },
      (error: HttpErrorResponse) => {
        const mensagemErro =
          error.status === 401
            ? 'Credenciais inválidas. Verifique o e-mail e a senha.'
            : 'Erro ao realizar login. Tente novamente mais tarde.';
        this.exibirMensagemErro(mensagemErro);
      }
    );
  } else {
    this.exibirMensagemErro(this.getMensagemErro());
  }
}

  private isEmailValido(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private isSenhaValida(senha: string): boolean {
    return senha.length >= 3; // Pode ajustar o comprimento mínimo conforme necessário
  }

  private getMensagemErro(): string {
    if (!this.isEmailValido(this.email)) {
      return 'O email inserido é inválido.';
    } else if (!this.isSenhaValida(this.senha)) {
      return 'A senha precisa ter no mínimo 3 caracteres.';
    }
    return 'Email ou senha inválidos';
  }

  private exibirMensagemSucesso(mensagem: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: mensagem,
    });
  }

  private exibirMensagemErro(mensagem: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: mensagem,
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
