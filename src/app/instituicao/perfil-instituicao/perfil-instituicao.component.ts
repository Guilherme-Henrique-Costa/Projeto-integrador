import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  PerfilInstituicao,
  PerfilInstituicaoService,
} from './perfil-instituicao.service';
import { MenuInstituicaoService } from '../menu-instituicao/menu-instituicao.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-perfil-instituicao',
  templateUrl: './perfil-instituicao.component.html',
  styleUrls: ['./perfil-instituicao.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class PerfilInstituicaoComponent {
  sidebarOpen = true;

  // nome exibido na sidebar (reativo)
  instituicaoNome$ = this.menuService.getInstituicaoNome$();

  // form
  cadastroForm: FormGroup = this.fb.group({
    id: [null],
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
    cnpj: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(16)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
  });

  // estado de carregamento do submit
  saving = false;

  sidebarItems = [
    { label: 'Menu', icon: 'pi pi-compass', route: '/menu-instituicao' },
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil-instituicao' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas-instituicao' },
    { label: 'Candidatos', icon: 'pi pi-user', route: '/candidatos' },
    { label: 'Feedback', icon: 'pi pi-inbox', route: '/feedback-instituicao' },
    { label: 'Gestão', icon: 'pi pi-chart-line', route: '/gestao' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagem-instituicao' },
    { label: 'Ranking', icon: 'pi pi-star-fill', route: '/ranking-instituicao' },
    { label: 'Sair', icon: 'pi pi-sign-out', route: '/login-instituicao' },
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly perfilService: PerfilInstituicaoService,
    private readonly menuService: MenuInstituicaoService,
    private readonly message: MessageService,
  ) {}

  ngOnInit(): void {
    this.menuService.loadFromStorage(); // garante nome na sidebar

    const emailSalvo = localStorage.getItem('userEmail');
    if (emailSalvo) {
      this.perfilService.findByEmail(emailSalvo).subscribe({
        next: (inst) => {
          // normaliza CNPJ para string
          const cnpj = String(inst.cnpj ?? '');
          this.cadastroForm.patchValue({
            id: inst.id ?? null,
            nome: inst.nome ?? '',
            email: inst.email ?? '',
            cnpj,
            password: inst.password ?? '',
          });
        },
        error: () => {
          this.message.add({
            severity: 'warn',
            summary: 'Aviso',
            detail: 'Não foi possível carregar o perfil da instituição.',
          });
        },
      });
    }
  }

  salvar(): void {
    if (this.cadastroForm.invalid) {
      this.cadastroForm.markAllAsTouched();
      this.message.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Verifique os campos do formulário.',
      });
      return;
    }

    const perfil: PerfilInstituicao = this.cadastroForm.getRawValue();
    // garante tipo string
    perfil.cnpj = String(perfil.cnpj ?? '');

    this.saving = true;
    const req$ = perfil.id
      ? this.perfilService.update(perfil.id, perfil)
      : this.perfilService.create(perfil);

    req$.subscribe({
      next: (res) => {
        // se o nome mudou, atualizar menu
        if (res?.nome) this.menuService.setInstituicaoNome(res.nome);

        this.message.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: perfil.id ? 'Perfil atualizado com sucesso.' : 'Perfil criado com sucesso.',
        });
        this.router.navigate(['/menu-instituicao']);
      },
      error: (err: Error) => {
        this.message.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.message || 'Falha ao salvar o perfil.',
        });
      },
      complete: () => (this.saving = false),
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  getErrorMessage(field: string): string {
    const c = this.cadastroForm.get(field);
    if (!c) return '';

    if (c.hasError('required')) return `${this.getFieldLabel(field)} é obrigatório.`;
    if (c.hasError('minlength'))
      return `Mínimo ${c.errors?.['minlength'].requiredLength} caracteres.`;
    if (c.hasError('maxlength'))
      return `Máximo ${c.errors?.['maxlength'].requiredLength} caracteres.`;
    if (c.hasError('email')) return `E-mail inválido.`;
    return '';
  }

  private getFieldLabel(field: string): string {
    const labels: Record<string, string> = {
      nome: 'Nome',
      email: 'E-mail',
      cnpj: 'CNPJ',
      password: 'Senha',
    };
    return labels[field] ?? field;
  }

  sair(): void {
    this.menuService.logout();
    this.router.navigate(['/login-instituicao']);
  }

  trackByIndex = (i: number) => i;
}
