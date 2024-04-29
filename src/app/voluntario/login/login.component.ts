import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Text, placeholder, label } from 'src/assets/dicionario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
  cadastrar() {
    this.router.navigate(['/cadastro']);
  }
}
