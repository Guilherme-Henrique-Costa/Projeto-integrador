import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MenuInstituicaoService } from '../menu-instituicao/menu-instituicao.service';
import { GestaoInstituicaoService, Voluntario } from './gestao-instituicao.service';

type MenuItem = { label: string; icon: string; route: string };

@Component({
  selector: 'app-gestao-instituicao',
  templateUrl: './gestao-instituicao.component.html',
  styleUrls: ['./gestao-instituicao.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestaoInstituicaoComponent implements OnInit {
  // UI / estado
  sidebarOpen = true;
  searchCtrl = new FormControl<string>('', { nonNullable: true });
  descricaoServico = '';
  voluntarioSelecionado: Voluntario | null = null;
  success = false;
  loadingVoluntarios = false;
  loadingSalvar = false;

  // nome (reativo)
  instituicaoNome$ = this.menuService.getInstituicaoNome$();

  // itens do menu (sidebar)
  sidebarItems: MenuItem[] = [
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

  voluntarios: Voluntario[] = [];

  constructor(
    private readonly menuService: MenuInstituicaoService,
    private readonly router: Router,
    private readonly gestaoService: GestaoInstituicaoService
  ) {}

  ngOnInit(): void {
    console.log('[Gestao] ngOnInit');
    this.menuService.loadFromStorage();
    this.carregarVoluntarios();
  }

  carregarVoluntarios(): void {
  const instituicaoId = Number(localStorage.getItem('instituicaoId'));
  if (!instituicaoId) {
    console.warn('[Gestao] instituicaoId não encontrado no localStorage.');
    return;
  }

  this.loadingVoluntarios = true;
  console.log('[Gestao] carregando voluntarios instId=', instituicaoId);

  this.gestaoService.getVoluntariosDaInstituicao(instituicaoId).subscribe({
    next: (vols) => {
      this.voluntarios = vols || [];
      console.log('[Gestao] voluntarios recebidos:', this.voluntarios.length);
    },
    error: (err) => {
      console.error('[Gestao] erro ao buscar voluntarios:', err.message || err);
    },
    complete: () => (this.loadingVoluntarios = false),
  });
}

  // lista filtrada pela busca
  get voluntariosFiltrados(): Voluntario[] {
  const q = (this.searchCtrl.value || '').trim().toLowerCase();
  if (!q) return this.voluntarios;
  return this.voluntarios.filter((v) => {
    const nome = (v.nome || '').toLowerCase();
    const email = (v.emailInstitucional || '').toLowerCase();
    const area = (v.areaInteresse || '').toLowerCase();
    return nome.includes(q) || email.includes(q) || area.includes(q);
  });
}

  get servicoLen(): number {
    return (this.descricaoServico || '').length;
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    console.log('[Gestao] sidebarOpen:', this.sidebarOpen);
  }

  selecionarVoluntario(vol: Voluntario): void {
    console.log('[Gestao] selecionarVoluntario id=', vol?.id);
    this.voluntarioSelecionado = vol;
    this.descricaoServico = '';
    this.success = false;
  }

  registrarServico(): void {
    if (!this.voluntarioSelecionado || !this.descricaoServico.trim()) {
      console.warn('[Gestao] registrarServico: voluntário ou descrição ausentes.');
      return;
    }

    const instituicaoId = Number(localStorage.getItem('instituicaoId'));
    if (!instituicaoId) {
      console.warn('[Gestao] registrarServico: instituicaoId ausente.');
      return;
    }

    const payload = {
      instituicaoId,
      voluntarioId: this.voluntarioSelecionado.id,
      descricao: this.descricaoServico.trim(),
    };

    console.log('[Gestao] POST registrar servico:', payload);
    this.loadingSalvar = true;

    this.gestaoService.registrarServico(payload).subscribe({
      next: (res) => {
        console.log('[Gestao] serviço registrado id=', res.id);
        this.success = true;
        this.descricaoServico = '';
        setTimeout(() => (this.success = false), 2000);
      },
      error: (err) => {
        console.error('[Gestao] erro ao registrar serviço:', err.message || err);
      },
      complete: () => (this.loadingSalvar = false),
    });
  }

  sair(): void {
    this.menuService.logout();
    this.router.navigate(['/login-instituicao']);
  }

  /** trackBys corretos para cada lista */
  trackByMenu = (i: number, _item: MenuItem) => i;
  trackByVol = (_: number, v: Voluntario) => v.id;
}
