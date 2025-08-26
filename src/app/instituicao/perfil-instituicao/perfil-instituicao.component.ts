import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  PerfilInstituicao,
  PerfilInstituicaoService,
} from './perfil-instituicao.service';
import { MenuInstituicaoService } from '../menu-instituicao/menu-instituicao.service';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs';

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

  // preview do logo (dataURL ou URL do servidor)
  logoPreview: string | null = null;

  // form
  cadastroForm: FormGroup = this.fb.group({
    // básicos
    id: [null],
    nome: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(64)],
    ],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(40)],
    ],
    cnpj: [
      '',
      [Validators.required, Validators.minLength(14), Validators.maxLength(16)],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    ],

    // mídia
    logoUrl: [''],

    // contato
    telefone: ['', [Validators.minLength(10), Validators.maxLength(20)]],
    whatsapp: ['', [Validators.maxLength(20)]],
    site: ['', [Validators.maxLength(120)]],

    // endereço
    cep: ['', [Validators.maxLength(9)]],
    endereco: ['', [Validators.maxLength(120)]],
    numero: ['', [Validators.maxLength(16)]],
    complemento: ['', [Validators.maxLength(60)]],
    bairro: ['', [Validators.maxLength(80)]],
    cidade: ['', [Validators.maxLength(80)]],
    uf: ['', [Validators.maxLength(2)]],
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
    {
      label: 'Mensagens',
      icon: 'pi pi-comments',
      route: '/mensagem-instituicao',
    },
    {
      label: 'Ranking',
      icon: 'pi pi-star-fill',
      route: '/ranking-instituicao',
    },
    { label: 'Sair', icon: 'pi pi-sign-out', route: '/login-instituicao' },
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly perfilService: PerfilInstituicaoService,
    private readonly menuService: MenuInstituicaoService,
    private readonly message: MessageService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.menuService.loadFromStorage(); // garante nome na sidebar

    const emailSalvo = localStorage.getItem('userEmail');
    if (emailSalvo) {
      this.perfilService.findByEmail(emailSalvo).subscribe({
        next: (inst) => {
          // normaliza CNPJ para string
          const cnpj = String(inst.cnpj ?? '');

          // se o backend já tiver URL de logo, mostra no preview
          this.logoPreview = inst.logoUrl ?? null;

          this.cadastroForm.patchValue({
            id: inst.id ?? null,
            nome: inst.nome ?? '',
            email: inst.email ?? '',
            cnpj,
            password: inst.password ?? '',

            logoUrl: inst.logoUrl ?? '',

            telefone: inst.telefone ?? '',
            whatsapp: inst.whatsapp ?? '',
            site: inst.site ?? '',

            cep: inst.cep ?? '',
            endereco: inst.endereco ?? '',
            numero: inst.numero ?? '',
            complemento: inst.complemento ?? '',
            bairro: inst.bairro ?? '',
            cidade: inst.cidade ?? '',
            uf: inst.uf ?? '',
          } as any);

          this.cdr.markForCheck();
        },
        error: () => {
          this.message.add({
            severity: 'warn',
            summary: 'Aviso',
            detail: 'Não foi possível carregar o perfil da instituição.',
          });
          this.cdr.markForCheck();
        },
      });
    }
  }

  salvar(): void {
    if (this.cadastroForm.invalid) {
      /* ...igual acima... */ return;
    }

    this.saving = true;
    const v = this.cadastroForm.getRawValue();

    this.perfilService
      .updateInstituicao(v.id, {
        nome: v.nome,
        email: v.email,
        cnpj: String(v.cnpj ?? ''),
        password: v.password || undefined,
      })
      .pipe(
        switchMap((instAtualizada) => {
          if (instAtualizada?.nome)
            this.menuService.setInstituicaoNome(instAtualizada.nome);
          const perfil: any = {
            logoUrl: v.logoUrl || null,
            telefone: v.telefone || null,
            whatsapp: v.whatsapp || null,
            site: v.site || null,
            cep: v.cep || null,
            endereco: v.endereco || null,
            numero: v.numero || null,
            complemento: v.complemento || null,
            bairro: v.bairro || null,
            cidade: v.cidade || null,
            uf: v.uf || null,
          };
          return this.perfilService.upsertPerfilByInstituicaoId(v.id, perfil);
        })
      )
      .subscribe({
        next: () => {
          this.message.add({
            severity: 'success',
            summary: 'Perfil',
            detail: 'Dados salvos com sucesso.',
          });
          this.router.navigate(['/menu-instituicao']);
        },
        error: (e) => {
          this.saving = false;
          this.message.add({
            severity: 'error',
            summary: 'Erro',
            detail: e.message,
          });
        },
        complete: () => {
          this.saving = false;
          this.cdr.markForCheck();
        },
      });
  }

  // ====== Logo ======
  onLogoChange(evt: Event): void {
    const input = evt.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/') || file.size > 2 * 1024 * 1024) {
      this.message.add({
        severity: 'warn',
        summary: 'Logo inválido',
        detail: 'Envie uma imagem (PNG/JPG) de até 2 MB.',
      });
      input.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.logoPreview = reader.result as string;
      this.cadastroForm.patchValue({ logoUrl: this.logoPreview });
      this.cdr.markForCheck();
    };
    reader.readAsDataURL(file);
  }

  removerLogo(): void {
    this.logoPreview = null;
    this.cadastroForm.patchValue({ logoUrl: '' });
    this.cdr.markForCheck();
  }

  // ====== CEP (ViaCEP) – opcional, sem HttpClient ======
  async buscarCep(): Promise<void> {
    const cepDigits = String(this.cadastroForm.get('cep')?.value || '').replace(
      /\D/g,
      ''
    );
    if (cepDigits.length !== 8) {
      this.message.add({
        severity: 'warn',
        summary: 'CEP',
        detail: 'Informe um CEP válido com 8 dígitos.',
      });
      return;
    }

    try {
      const resp = await fetch(`https://viacep.com.br/ws/${cepDigits}/json/`);
      const data = await resp.json();
      if (data?.erro) {
        this.message.add({
          severity: 'warn',
          summary: 'CEP',
          detail: 'CEP não encontrado.',
        });
        return;
      }
      this.cadastroForm.patchValue({
        endereco: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        uf: data.uf || '',
      });
      this.message.add({
        severity: 'success',
        summary: 'CEP',
        detail: 'Endereço preenchido automaticamente.',
      });
    } catch {
      this.message.add({
        severity: 'error',
        summary: 'CEP',
        detail: 'Falha ao consultar o CEP.',
      });
    } finally {
      this.cdr.markForCheck();
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  getErrorMessage(field: string): string {
    const c = this.cadastroForm.get(field);
    if (!c) return '';

    if (c.hasError('required'))
      return `${this.getFieldLabel(field)} é obrigatório.`;
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
      telefone: 'Telefone',
      whatsapp: 'WhatsApp',
      site: 'Site',
      cep: 'CEP',
      endereco: 'Endereço',
      numero: 'Número',
      complemento: 'Complemento',
      bairro: 'Bairro',
      cidade: 'Cidade',
      uf: 'UF',
    };
    return labels[field] ?? field;
  }

  sair(): void {
    this.menuService.logout();
    this.router.navigate(['/login-instituicao']);
  }

  trackByIndex = (i: number) => i;
}
