import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Text, placeholder, label, frases } from 'src/assets/dicionario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  position!: string;
  displayPosition!: boolean;

  text = Text;
  placeholder = placeholder;
  label = label;

  frasesAleatorias = frases;


  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.position = 'center';
    this.displayPosition = true;
    // Intencionalmente vazio para uso futuro
  }

  aceitar() {
      this.router.navigate(['/login']);
    }

    rejeitar() {
      this.router.navigate(['/cadastro-rejeitado']);
    }

  login(): void {
    if (this.username === '' || this.password === '') {
      alert('Por favor, preencha todos os campos.');
    } else {
      alert('Login realizado com sucesso.');
    }
  }
  cadastrar() {
    this.router.navigate(['/cadastro']);
  }

  voltar() {
    this.router.navigate(['/home']);
  }
}
