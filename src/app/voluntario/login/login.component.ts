import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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

  position!: string;
  displayPosition!: boolean;

  text = Text;
  placeholder = placeholder;
  label = label;

  frasesAleatorias = frases;


  constructor(
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.position = 'center';
    this.displayPosition = true;
  }



  login(): void {
    const email = this.email;
    const senha = this.senha;

    // Verifica se o email é válido (contém "@" e algo antes e depois)
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Verifica se a senha tem pelo menos 3 caracteres
    const senhaValida = senha.length >= 3;

    // Apenas exibe erro se o email não for válido ou se a senha não cumprir as regras
    if (emailValido && senhaValida) {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Login feito com sucesso',
        styleClass: 'toast-success'
      });

      setTimeout(() => {
        this.router.navigate(['/menu']);
      }, 1000);
    } else {
      // Determina qual mensagem de erro exibir
      let erroMensagem = 'Email ou senha inválidos';
      if (!emailValido) {
        erroMensagem = 'O email inserido é inválido.';
      } else if (!senhaValida) {
        erroMensagem = 'A senha precisa ter no mínimo 3 caracteres.';
      }

      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: erroMensagem,
        styleClass: 'toast-error'
      });
    }
  }

  aceitar() {
    this.displayPosition = false;
    this.router.navigate(['/login']);
  }

  rejeitar() {
    this.displayPosition = false;
    this.router.navigate(['/cadastro-rejeitado']);
  }


  cadastrar() {
    this.router.navigate(['/cadastro']);
  }

  voltar() {
    this.router.navigate(['/home']);
  }

  redefinirSenha() {
    this.router.navigate(['/confirmar-senha']);
  }
}
