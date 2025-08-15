import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuInstituicaoService } from '../menu-instituicao/menu-instituicao.service';

interface ItemRanking {
  posicao: number;
  nome: string;
}

interface SidebarItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-ranking-instituicao',
  templateUrl: './ranking-instituicao.component.html',
  styleUrls: ['./ranking-instituicao.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RankingInstituicaoComponent {
  sidebarOpen = true;
  searchQuery = '';

  instituicaoNome$ = this.menuService.getInstituicaoNome$();

  sidebarItems: SidebarItem[] = [
    { label: 'Menu',       icon: 'pi pi-compass',   route: '/menu-instituicao' },
    { label: 'Perfil',     icon: 'pi pi-user',      route: '/perfil-instituicao' },
    { label: 'Vagas',      icon: 'pi pi-bookmark',  route: '/vagas-instituicao' },
    { label: 'Candidatos', icon: 'pi pi-user',      route: '/candidatos' },
    { label: 'Feedback',   icon: 'pi pi-inbox',     route: '/feedback-instituicao' },
    { label: 'Gestão',     icon: 'pi pi-chart-line',route: '/gestao' },
    { label: 'Mensagens',  icon: 'pi pi-comments',  route: '/mensagem-instituicao' },
    { label: 'Ranking',    icon: 'pi pi-star-fill', route: '/ranking-instituicao' },
    { label: 'Sair',       icon: 'pi pi-sign-out',  route: '/login-instituicao' },
  ];

  ranking: ItemRanking[] = [
    { posicao: 1, nome: 'Fulano' },
    { posicao: 2, nome: 'Sicrano' },
    { posicao: 3, nome: 'Zé da Silva' },
    { posicao: 4, nome: 'Beltrano' },
    { posicao: 5, nome: 'Armando' },
  ];

  constructor(
    private readonly menuService: MenuInstituicaoService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.menuService.loadFromStorage();
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  get rankingFiltrado(): ItemRanking[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.ranking;
    return this.ranking.filter(i => i.nome.toLowerCase().includes(q));
  }

  medalEmoji(posicao: number): string {
    if (posicao === 1) return '🥇';
    if (posicao === 2) return '🥈';
    if (posicao === 3) return '🥉';
    return '🏅';
  }

  sair(): void {
    this.menuService.logout();
    this.router.navigate(['/login-instituicao']);
  }

  /** trackBy para o MENU (usa a rota como id estável) */
  trackByRoute = (_: number, item: SidebarItem) => item.route;

  /** trackBy para a LISTA DE RANKING (usa a posição) */
  trackByPosicao = (_: number, item: ItemRanking) => item.posicao;
}
