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

  // Método de login para autenticar o voluntário
  login(): void {
    if (this.isEmailValido(this.email) && this.isSenhaValida(this.senha)) {
      this.loginService.login({ email: this.email, password: this.senha }).subscribe(
        (response: Voluntario) => {
          console.log('Resposta do servidor:', response);  // Log para ver os dados recebidos
          if (response && response.email && response.id && response.nome) {
            localStorage.setItem('userEmail', response.email);
            localStorage.setItem('userId', response.id.toString());
            localStorage.setItem('userName', response.nome);  // Armazena o nome do voluntário
            this.redirecionarPara('/menu', 1000); // Redireciona para o menu
          } else {
            this.exibirMensagemErro('Erro ao processar os dados do usuário.');
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Erro de login:', error); // Log de erro no login
          this.exibirMensagemErro('Erro de login: ' + error.message);
        }
      );
  }
}

  // Validação de email
  public isEmailValido(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Validação de senha (mínimo de 3 caracteres)
  public isSenhaValida(senha: string): boolean {
    return senha.length >= 3;
  }

  // Mensagem de erro caso email ou senha sejam inválidos
  private getMensagemErro(email: string, senha: string): string {
    if (!this.isEmailValido(email)) {
      return 'O email inserido é inválido.';
    } else if (!this.isSenhaValida(senha)) {
      return 'A senha precisa ter no mínimo 3 caracteres.';
    }
    return 'Email ou senha inválidos';
  }

  // Mensagem de erro personalizada com base no status da resposta HTTP
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

  // Exibe uma mensagem de sucesso no login
  private exibirMensagemSucesso(mensagem: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: mensagem,
      styleClass: 'toast-success'
    });
  }

  // Exibe uma mensagem de erro em caso de falha no login
  private exibirMensagemErro(mensagem: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: mensagem,
      styleClass: 'toast-error'
    });
  }

  // Redireciona para uma rota específica após um delay (opcional)
  private redirecionarPara(rota: string, delay: number = 0): void {
    setTimeout(() => this.router.navigate([rota]), delay);
  }

  // Redireciona para a página de cadastro
  cadastrar(): void {
    this.redirecionarPara('/cadastro');
  }

  // Redireciona para a página inicial (home)
  voltar(): void {
    this.redirecionarPara('/home');
  }

  // Redireciona para a página de redefinição de senha
  redefinirSenha(): void {
    this.redirecionarPara('/confirmar-senha');
  }

  // Aceita as condições e redireciona para o login
  aceitar(): void {
    this.displayPosition = false;
    this.redirecionarPara('/login');
  }

  // Rejeita as condições e redireciona para uma página de rejeição de cadastro
  rejeitar(): void {
    this.displayPosition = false;
    this.redirecionarPara('/cadastro-rejeitado');
  }
}
