import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EsqueciSenhaAdminService } from './esqueci-senha-admin.service';

@Component({
  selector: 'app-esqueci-senha-admin',
  templateUrl: './esqueci-senha-admin.component.html',
  styleUrls: ['./esqueci-senha-admin.component.css']
})
export class EsqueciSenhaAdminComponent {
  carregando = false;
  erro: string | null = null;
  sucesso: string | null = null;

  // estado da etapa
  emailValidado = false;
  infoUsuario: { id?: number; nome?: string } | null = null;

  formulario = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    novaSenha: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(6)]],
    confirmarSenha: [{ value: '', disabled: true }, [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private service: EsqueciSenhaAdminService,
    private router: Router
  ) {}

  get f() { return this.formulario.controls; }

  /** Etapa 1: verificar e-mail */
  verificarEmail() {
    this.resetMensagens();
    if (this.f.email.invalid) {
      this.f.email.markAsTouched();
      return;
    }
    this.carregando = true;

    this.service.verificarEmail(this.f.email.value!).subscribe({
      next: (res) => {
        this.carregando = false;
        if (res.existe) {
          this.emailValidado = true;
          this.infoUsuario = { id: res.id, nome: res.nome };

          // Habilita campos de senha
          this.f.novaSenha.enable();
          this.f.confirmarSenha.enable();
          this.sucesso = 'E-mail localizado. Defina sua nova senha abaixo.';
        } else {
          this.erro = 'Este e-mail não está cadastrado.';
        }
      },
      error: (e: Error) => {
        this.carregando = false;
        this.erro = e.message || 'Falha ao verificar o e-mail.';
      }
    });
  }

  /** Etapa 2: trocar senha */
  trocarSenha() {
    this.resetMensagens();

    if (!this.emailValidado) {
      this.erro = 'Valide o e-mail antes de alterar a senha.';
      return;
    }
    if (this.f.novaSenha.invalid || this.f.confirmarSenha.invalid) {
      this.f.novaSenha.markAsTouched();
      this.f.confirmarSenha.markAsTouched();
      return;
    }
    if (this.f.novaSenha.value !== this.f.confirmarSenha.value) {
      this.erro = 'As senhas não coincidem.';
      return;
    }

    this.carregando = true;
    const email = this.f.email.value!;
    const novaSenha = this.f.novaSenha.value!;

    this.service.redefinirSenha(email, novaSenha).subscribe({
      next: () => {
        this.carregando = false;
        this.sucesso = 'Senha alterada com sucesso! Você já pode fazer login.';
        setTimeout(() => this.router.navigate(['/login-admin']), 1200);
      },
      error: (e: Error) => {
        this.carregando = false;
        this.erro = e.message || 'Não foi possível alterar a senha.';
      }
    });
  }

  voltarLogin() { this.router.navigate(['/login-admin']); }

  private resetMensagens() { this.erro = this.sucesso = null; }
}
