import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-instituicao',
  templateUrl: './menu-instituicao.component.html',
  styleUrls: ['./menu-instituicao.component.css']
})
export class MenuInstituicaoComponent {
  searchQuery: string = '';
  sidebarOpen: boolean = true;

  sidebarItems = [
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil-instituicao' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas-instituicao' },
    { label: 'Gestão', icon: 'pi pi-chart-line', route: '/gestao' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagens-instituicao' },
    { label: 'Ranking', icon: 'pi pi-star-fill', route: '/ranking' },
    { label: 'Relatórios', icon: 'pi pi-copy', route: '/relatorios' },
    { label: 'Sair', icon: 'pi pi-sign-out', route: '/login-instituicao' }
  ];

  rankingItems = [
    '🥇 1º Guilherme',
    '🥈 2º Vinicius',
    '🥉 3º Alexandre',
    '🏅 4º Sergio',
    '🏅 5º Julia'
  ];

  feedbackItems = [
    '⭐⭐⭐⭐☆ Sergio',
    '⭐⭐⭐☆☆ Vinicius',
    '⭐⭐☆☆☆ Julia',
    '⭐⭐⭐⭐⭐ Guilherme',
    '⭐⭐⭐☆☆ Alexandre'
  ];

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  filteredRankingItems(): string[] {
    if (!this.searchQuery) return this.rankingItems;
    return this.rankingItems.filter(item =>
      item.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  filteredFeedbackItems(): string[] {
    if (!this.searchQuery) return this.feedbackItems;
    return this.feedbackItems.filter(item =>
      item.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
