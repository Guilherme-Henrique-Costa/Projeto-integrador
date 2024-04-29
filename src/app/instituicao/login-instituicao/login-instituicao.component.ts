import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { label, placeholder, Text } from 'src/assets/dicionario';

@Component({
  selector: 'app-login-instituicao',
  templateUrl: './login-instituicao.component.html',
  styleUrls: ['./login-instituicao.component.css']
})
export class LoginInstituicaoComponent {
  username: string = '';
  password: string = '';

  text = Text;
  placeholder = placeholder;
  label = label;


  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Intencionalmente vazio para uso futuro
  }

  login(): void {
    if (this.username === '' || this.password === '') {
      alert('Por favor, preencha todos os campos.');
    } else {
      alert('Login realizado com sucesso.');
    }
  }
  cadastrarInstituicao() {
    this.router.navigate(['/cadastro-instituicao']);
  }
  voltar() {
    this.router.navigate(['/home']);
  }
}
