import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CandidatosService, Candidatura, Vaga } from './candidatos.service';
import { FormControl } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';
import { MessageService } from 'primeng/api';
import { MenuInstituicaoService } from '../menu-instituicao/menu-instituicao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class CandidatosComponent {
  sidebarOpen = true;

  /** Nome da instituição (reativo) */
  instituicaoNome$ = this.menuService.getInstituicaoNome$();

  /** Estado */
  vagasComCandidatos: Vaga[] = [];
  candidatos: Candidatura[] = [];
  vagaSelecionada: Vaga | null = null;

  /** Busca reativa */
  searchCtrl = new FormControl<string>('', { nonNullable: true });

  /** Listas filtradas reativas */
  vagasFiltradas$ = combineLatest([this.searchCtrl.valueChanges.pipe(startWith(''))]).pipe(
    map(([q]) => {
      const query = (q || '').toLowerCase();
      const out = query
        ? this.vagasComCandidatos.filter(
            (v) =>
              (v.cargo || '').toLowerCase().includes(query) ||
              (v.localidade || '').toLowerCase().includes(query) ||
              (v.descricao || '').toLowerCase().includes(query),
          )
        : this.vagasComCandidatos;
      // print
      console.log('[CandidatosComponent] vagasFiltradas', out.length);
      return out;
    }),
  );

  candidatosFiltrados$ = combineLatest([this.searchCtrl.valueChanges.pipe(startWith(''))]).pipe(
    map(([q]) => {
      const query = (q || '').toLowerCase();
      const out = query
        ? this.candidatos.filter(
            (c) =>
              (c.nomeVoluntario || '').toLowerCase().includes(query) ||
              (c.emailVoluntario || '').toLowerCase().includes(query) ||
              String(c.status || '').toLowerCase().includes(query),
          )
        : this.candidatos;
      // print
      console.log('[CandidatosComponent] candidatosFiltrados', out.length);
      return out;
    }),
  );

  loadingVagas = false;
  loadingCandidatos = false;

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
    private readonly candidatosService: CandidatosService,
    private readonly message: MessageService,
    private readonly menuService: MenuInstituicaoService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.menuService.loadFromStorage();
    this.carregarVagasComCandidatos();
  }

  carregarVagasComCandidatos(): void {
    this.loadingVagas = true;
    const instituicaoId = Number(localStorage.getItem('instituicaoId')) || undefined;
    console.log('[CandidatosComponent] carregarVagasComCandidatos instituicaoId=', instituicaoId);

    this.candidatosService.listarVagasComCandidatos(instituicaoId).subscribe({
      next: (vagas) => {
        this.vagasComCandidatos = vagas ?? [];
        console.log('[CandidatosComponent] vagas carregadas:', this.vagasComCandidatos.length);
      },
      error: (err: Error) => {
        console.error('[CandidatosComponent] erro ao carregar vagas:', err);
        this.message.add({ severity: 'error', summary: 'Erro', detail: err.message });
      },
      complete: () => (this.loadingVagas = false),
    });
  }

  selecionarVaga(vaga: Vaga): void {
    console.log('[CandidatosComponent] selecionarVaga id=', vaga?.id);
    this.vagaSelecionada = vaga;
    this.carregarCandidatos(vaga.id);
  }

  carregarCandidatos(vagaId: number): void {
    this.loadingCandidatos = true;
    console.log('[CandidatosComponent] carregarCandidatos vagaId=', vagaId);

    this.candidatosService.listarCandidatos(vagaId).subscribe({
      next: (list) => {
        this.candidatos = list || [];
        console.log('[CandidatosComponent] candidatos carregados:', this.candidatos.length);
      },
      error: (err: Error) => {
        console.error('[CandidatosComponent] erro ao carregar candidatos:', err);
        this.message.add({ severity: 'error', summary: 'Erro', detail: err.message });
      },
      complete: () => (this.loadingCandidatos = false),
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    console.log('[CandidatosComponent] sidebarOpen:', this.sidebarOpen);
  }

  sair(): void {
    this.menuService.logout();
    this.router.navigate(['/login-instituicao']);
  }

  trackByIndex = (i: number) => i;
}
