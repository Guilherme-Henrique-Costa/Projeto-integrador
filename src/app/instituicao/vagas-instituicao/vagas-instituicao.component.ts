import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MenuInstituicaoService } from '../menu-instituicao/menu-instituicao.service';
import { VagasInstituicaoService, VagaInstituicao } from './vagas-instituicao.service';

@Component({
  selector: 'app-vagas-instituicao',
  templateUrl: './vagas-instituicao.component.html',
  styleUrls: ['./vagas-instituicao.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class VagasInstituicaoComponent {
  // ===== Sidebar / Topbar =====
  sidebarOpen = true;
  instituicaoNome$ = this.menuService.getInstituicaoNome$();
  sidebarItems = [
    { label: 'Menu',        icon: 'pi pi-compass',   route: '/menu-instituicao' },
    { label: 'Perfil',      icon: 'pi pi-user',      route: '/perfil-instituicao' },
    { label: 'Vagas',       icon: 'pi pi-bookmark',  route: '/vagas-instituicao' },
    { label: 'Candidatos',  icon: 'pi pi-user',      route: '/candidatos' },
    { label: 'Feedback',    icon: 'pi pi-inbox',     route: '/feedback-instituicao' },
    { label: 'Gestão',      icon: 'pi pi-chart-line',route: '/gestao' },
    { label: 'Mensagens',   icon: 'pi pi-comments',  route: '/mensagem-instituicao' },
    { label: 'Ranking',     icon: 'pi pi-star-fill', route: '/ranking-instituicao' },
    { label: 'Sair',        icon: 'pi pi-sign-out',  route: '/login-instituicao' },
  ];
  trackByIndex = (i: number) => i;
  toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; }
  sair(): void {
    this.menuService.logout();
    this.router.navigate(['/login-instituicao']);
  }

  // ===== Form =====
  vagaForm: FormGroup = this.fb.group({
    // comuns
    cargo: ['', [Validators.required, Validators.maxLength(80)]],
    area: ['', [Validators.required, Validators.maxLength(80)]],
    localidade: ['', [Validators.required, Validators.maxLength(80)]],
    tipoVaga: ['Presencial', [Validators.required]], // Presencial | Remota | Híbrida
    disponibilidade: ['', [Validators.required, Validators.maxLength(80)]],
    horario: ['', [Validators.required, Validators.maxLength(80)]],
    tempoVoluntariado: ['', [Validators.required, Validators.maxLength(80)]],
    especificacoes: ['', [Validators.required, Validators.maxLength(200)]], // CSV no form
    descricao: ['', [Validators.required, Validators.maxLength(2000)]],
    quantidadeVagas: [null, [Validators.min(1), Validators.max(999)]],
    dataInicio: [null],
    beneficios: ['', [Validators.maxLength(400)]],
  });

  saving = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly vagasService: VagasInstituicaoService,
    private readonly menuService: MenuInstituicaoService,
    private readonly message: MessageService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.menuService.loadFromStorage();
    // min da data (se usar no template)
    setTimeout(() => {
      const el = document.getElementById('dataInicio') as HTMLInputElement | null;
      if (el) el.min = new Date().toISOString().slice(0, 10);
    }, 0);
  }

  // ===== Helpers =====
  isFieldInvalid(field: string): boolean {
    const c = this.vagaForm.get(field);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  private trimForm(): void {
    const keys = [
      'cargo','area','localidade','tipoVaga','disponibilidade','horario',
      'tempoVoluntariado','especificacoes','descricao','beneficios'
    ] as const;
    const patch: Record<string, any> = {};
    keys.forEach(k => {
      const v = this.vagaForm.get(k)?.value;
      if (typeof v === 'string') patch[k] = v.trim();
    });
    if (Object.keys(patch).length) this.vagaForm.patchValue(patch, { emitEvent: false });
  }

  /** tenta obter o id da instituição do localStorage */
  private resolveInstituicaoId(): number | null {
    const keys = ['instituicaoId', 'idInstituicao', 'perfilInstituicaoId'];
    for (const k of keys) {
      const v = localStorage.getItem(k);
      if (v && !isNaN(+v)) return +v;
    }
    const raw = localStorage.getItem('instituicao');
    if (raw) {
      try { const obj = JSON.parse(raw); if (obj?.id && !isNaN(+obj.id)) return +obj.id; } catch {}
    }
    return null;
  }

  private csvToArray(csv: string): string[] {
    return (csv || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }

  // ===== Submit =====
  onSubmit(): void {
    if (this.vagaForm.invalid) {
      this.vagaForm.markAllAsTouched();
      this.message.add({ severity: 'error', summary: 'Formulário inválido', detail: 'Revise os campos destacados.' });
      this.cdr.markForCheck();
      return;
    }

    const instituicaoId = this.resolveInstituicaoId();
    if (!instituicaoId) {
      this.message.add({ severity: 'warn', summary: 'Instituição não encontrada', detail: 'Faça login novamente.' });
      this.cdr.markForCheck();
      return;
    }

    this.trimForm();
    const raw = this.vagaForm.getRawValue();

    // extrai cidade da "localidade" (ex.: "Brasília, DF" -> "Brasília")
    const cidade = (raw.localidade || '').split(',')[0].trim();

    // monta exatamente no formato do seu service/interface
    const payload: VagaInstituicao = {
      cargo: raw.cargo,
      localidade: raw.localidade,
      descricao: raw.descricao,
      especificacoes: this.csvToArray(raw.especificacoes),
      tipoVaga: raw.tipoVaga,
      area: raw.area,
      horario: raw.horario,
      tempoVoluntariado: raw.tempoVoluntariado,
      disponibilidade: raw.disponibilidade,
      cidade,
      latitude: 0,   // TODO: geocodificar se necessário
      longitude: 0,  // TODO: geocodificar se necessário
      instituicao: { id: instituicaoId },
    };

    this.saving = true;

    this.vagasService.cadastrarVaga(payload).subscribe({
      next: () => {
        this.message.add({ severity: 'success', summary: 'Vaga publicada', detail: 'Sua vaga foi enviada com sucesso.' });
        // limpa mantendo modalidade padrão
        const tipoVagaDefault = this.vagaForm.get('tipoVaga')?.value ?? 'Presencial';
        this.vagaForm.reset({ tipoVaga: tipoVagaDefault });
      },
      error: (err: Error) => {
        this.message.add({ severity: 'error', summary: 'Erro ao publicar', detail: err.message || 'Tente novamente mais tarde.' });
      },
      complete: () => {
        this.saving = false;
        this.cdr.markForCheck();
      },
    });
  }
}
