import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginAdminService } from './login-admin.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  email = '';
  senha = '';
  lembrar = false;

  carregando = false;
  erro: string | null = null;

  constructor(
    private readonly loginService: LoginAdminService,
    private readonly router: Router
  ) {}

  enviar(form: NgForm) {
  if (form.invalid) { Object.values(form.controls).forEach(c => c.markAsTouched()); return; }
  this.carregando = true;
  this.erro = null;

  this.loginService.login({ email: this.email, senha: this.senha }).subscribe({
    next: () => {
      this.carregando = false;
      if (this.lembrar) localStorage.setItem('admin_lembrar', '1');
      else localStorage.removeItem('admin_lembrar');
      this.router.navigate(['/menu-admin']);
    },
    error: (e) => {
      this.carregando = false;
      this.erro = e?.message || 'Falha no login. Verifique suas credenciais.';
    }
  });
}

  get anoAtual(): number {
    return new Date().getFullYear();
  }
}
