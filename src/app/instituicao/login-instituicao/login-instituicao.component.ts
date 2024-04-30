import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { label, placeholder, Text } from 'src/assets/dicionario';

@Component({
  selector: 'app-login-instituicao',
  templateUrl: './login-instituicao.component.html',
  styleUrls: ['./login-instituicao.component.css'],
  providers: [MessageService]
})
export class LoginInstituicaoComponent {
  username: string = '';
  password: string = '';

  position!: string;
  displayPosition!: boolean;

  text = Text;
  placeholder = placeholder;
  label = label;


  constructor(
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.position = 'center';
    this.displayPosition = true;
    // Intencionalmente vazio para uso futuro
  }

  login(): void {
    this.messageService.add({
      severity: 'sucesso',
      summary: 'Sucesso',
      detail: 'Login feito com sucesso',
      styleClass: 'toast-success'});
  }
  cadastrarInstituicao() {
    this.router.navigate(['/cadastro-instituicao']);
  }
  voltar() {
    this.router.navigate(['/home']);
  }
}
