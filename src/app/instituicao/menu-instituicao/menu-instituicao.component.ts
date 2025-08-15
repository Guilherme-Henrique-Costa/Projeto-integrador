import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  map,
  startWith,
} from 'rxjs';
import { MenuInstituicaoService } from './menu-instituicao.service';
import { Router } from '@angular/router';

interface SidebarItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-menu-instituicao',
  templateUrl: './menu-instituicao.component.html',
  styleUrls: ['./menu-instituicao.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuInstituicaoComponent implements OnInit {
  sidebarOpen = true;

  /** Nome exibido no topo da sidebar */
  instituicaoNome$ = this.menuService.getInstituicaoNome$();

  /** Itens de menu (fixos) */
  sidebarItems: SidebarItem[] = [
    { label: 'Menu',        icon: 'pi pi-compass',    route: '/menu-instituicao' },
    { label: 'Perfil',      icon: 'pi pi-user',       route: '/perfil-instituicao' },
    { label: 'Vagas',       icon: 'pi pi-bookmark',   route: '/vagas-instituicao' },
    { label: 'Candidatos',  icon: 'pi pi-users',      route: '/candidatos' },
    { label: 'Feedback',    icon: 'pi pi-inbox',      route: '/feedback-instituicao' },
    { label: 'Gestão',      icon: 'pi pi-chart-line', route: '/gestao' },
    { label: 'Mensagens',   icon: 'pi pi-comments',   route: '/mensagem-instituicao' },
    { label: 'Ranking',     icon: 'pi pi-star-fill',  route: '/ranking-instituicao' },
    { label: 'Sair',        icon: 'pi pi-sign-out',   route: '/login-instituicao' },
  ];

  /** Dados de exemplo (poderiam vir de serviço HTTP futuramente) */
  private rankingSrc$ = new BehaviorSubject<string[]>([
    '🥇 1º Guilherme',
    '🥈 2º Vinicius',
    '🥉 3º Alexandre',
    '🏅 4º Sergio',
    '🏅 5º Julia',
  ]);

  private feedbackSrc$ = new BehaviorSubject<string[]>([
    '⭐⭐⭐⭐☆ Sergio',
    '⭐⭐⭐☆☆ Vinicius',
    '⭐⭐☆☆☆ Julia',
    '⭐⭐⭐⭐⭐ Guilherme',
    '⭐⭐☆��☆ Alexandre',
  ]);

  /** Busca reativa */
  searchCtrl = new FormControl<string>('', { nonNullable: true });

  /** Listas filtradas reativas */
  rankingItems$ = combineLatest([
    this.rankingSrc$,
    this.searchCtrl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([items, q]) =>
      !q ? items : items.filter((i) => i.toLowerCase().includes(q.toLowerCase())),
    ),
  );

  feedbackItems$ = combineLatest([
    this.feedbackSrc$,
    this.searchCtrl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([items, q]) =>
      !q ? items : items.filter((i) => i.toLowerCase().includes(q.toLowerCase())),
    ),
  );

  constructor(
    private readonly menuService: MenuInstituicaoService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    // Garante que o nome seja carregado do storage
    this.menuService.loadFromStorage();
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  /** trackBy para listas (melhora performance) */
  trackByIndex = (_: number, __: unknown) => _;

  /** Ação de sair */
  sair(): void {
    this.menuService.logout();
    this.router.navigate(['/login-instituicao']);
  }
}
