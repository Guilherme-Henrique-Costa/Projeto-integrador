import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroAdminService } from './cadastro-admin.service';

@Component({
  selector: 'app-cadastro-admin',
  templateUrl: './cadastro-admin.component.html',
  styleUrls: ['./cadastro-admin.component.css']
})
export class CadastroAdminComponent {
  carregando = false;
  erro: string | null = null;
  sucesso: string | null = null;

  formulario = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    confirmar: ['', [Validators.required]],
    funcao: ['ADMIN_CEUB']
  });

  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroAdminService,
    private router: Router
  ) {}

  enviar() {
    this.erro = this.sucesso = null;

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const { senha, confirmar } = this.formulario.value;
    if (senha !== confirmar) {
      this.erro = 'As senhas não coincidem.';
      return;
    }

    this.carregando = true;
    const { nome, email, funcao } = this.formulario.value;

    this.cadastroService.registrar({
      nome: nome!, email: email!, senha: senha!, funcao: funcao || undefined
    }).subscribe({
      next: () => {
        this.carregando = false;
        this.sucesso = 'Conta criada com sucesso! Você já pode fazer login.';
        setTimeout(() => this.router.navigate(['/login-admin']), 1000);
      },
      error: (e: Error) => {
        this.carregando = false;
        this.erro = e.message || 'Não foi possível cadastrar.';
      }
    });
  }

  voltarLogin() { this.router.navigate(['/login-admin']); }

  get f() { return this.formulario.controls; }
}
