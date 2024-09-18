import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-rejeitado',
  templateUrl: './cadastro-rejeitado.component.html',
  styleUrls: ['./cadastro-rejeitado.component.css']
})
export class CadastroRejeitadoComponent {
  constructor(private router: Router) {}

  voltar(): void {
    this.router.navigate(['/home']);
  }
}
