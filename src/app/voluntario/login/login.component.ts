import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService, Voluntario } from './login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Text, placeholder, label, frases } from 'src/assets/dicionario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
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
    private loginService: LoginService // Injeção do LoginService
  ) {}

  ngOnInit(): void {}

  // login.component.ts
  login(): void {
    if (this.isEmailValido(this.email) && this.isSenhaValida(this.senha)) {
      this.loginService.login({ email: this.email, password: this.senha }).subscribe(
        (response: Voluntario) => {
          if (response && response.email && response.id) {
            this.exibirMensagemSucesso('Login feito com sucesso');
            this.redirecionarPara('/menu', 1000);
          } else {
            this.exibirMensagemErro('Erro ao processar os dados do usuário.');
          }
        },
        (error: HttpErrorResponse) => {
          const errorMsg = this.getMensagemErroLogin(error.status);
          this.exibirMensagemErro(errorMsg);
          console.error('Erro de login:', error);
        }
      );
    } else {
      const erroMensagem = this.getMensagemErro(this.email, this.senha);
      this.exibirMensagemErro(erroMensagem);
    }
  }



  public isEmailValido(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  public isSenhaValida(senha: string): boolean {
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

  getMensagemErroLogin(status: number): string {
    switch (status) {
      case 403:
        return 'Credenciais inválidas. Verifique seu email e senha.';
      case 500:
        return 'Erro interno do servidor. Tente novamente mais tarde.';
      default:
        return 'Erro ao realizar login. Verifique as credenciais.';
    }
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

  cadastrar(): void {
    this.redirecionarPara('/cadastro');
  }

  voltar(): void {
    this.redirecionarPara('/home');
  }

  redefinirSenha(): void {
    this.redirecionarPara('/confirmar-senha');
  }

  aceitar(): void {
    this.displayPosition = false;
    this.redirecionarPara('/login');
  }

  rejeitar(): void {
    this.displayPosition = false;
    this.redirecionarPara('/cadastro-rejeitado');
  }
}
