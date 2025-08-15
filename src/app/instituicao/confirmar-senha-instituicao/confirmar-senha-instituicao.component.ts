import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmarSenhaInstituicaoService } from './confirmar-senha-instituicao.service';

@Component({
  selector: 'app-confirmar-senha-instituicao',
  templateUrl: './confirmar-senha-instituicao.component.html',
  styleUrls: ['./confirmar-senha-instituicao.component.css']
})
export class ConfirmarSenhaInstituicaoComponent {
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
    private readonly fb: FormBuilder,
    private readonly service: ConfirmarSenhaInstituicaoService,
    private readonly router: Router
  ) {}

  get f() { return this.formulario.controls; }

  /** Etapa 1: verificar e-mail */
  verificarEmail(): void {
    this.resetMensagens();
    if (this.f.email.invalid) {
      this.f.email.markAsTouched();
      return;
    }

    this.carregando = true;
    const email = this.f.email.value!;

    this.service.verificarEmail(email).subscribe({
      next: (res) => {
        this.carregando = false;
        if (res.existe) {
          this.emailValidado = true;
          this.infoUsuario = { id: res.id, nome: res.nome };

          // habilita campos de senha
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
  trocarSenha(): void {
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
        setTimeout(() => this.router.navigate(['/login-instituicao']), 1200);
      },
      error: (e: Error) => {
        this.carregando = false;
        this.erro = e.message || 'Não foi possível alterar a senha.';
      }
    });
  }

  voltarLogin(): void {
    this.router.navigate(['/login-instituicao']);
  }

  private resetMensagens(): void {
    this.erro = this.sucesso = null;
  }
}
