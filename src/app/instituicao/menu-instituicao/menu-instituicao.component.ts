import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-instituicao',
  templateUrl: './menu-instituicao.component.html',
  styleUrls: ['./menu-instituicao.component.css']
})
export class MenuInstituicaoComponent implements OnInit {
  searchQuery: string = '';
  sidebarOpen: boolean = true;

  instituicaoNome: string = 'Instituição'; // Nome padrão, será substituído após o login

  sidebarItems = [
    { label: 'Menu', icon: 'pi pi-compass', route: '/menu-instituicao'},
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil-instituicao' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas-instituicao' },
    { label: 'Candidatos', icon: 'pi pi-user', route: '/candidatos'},
    { label: 'Feedback', icon: 'pi pi-inbox', route: '/feedback-instituicao' },
    { label: 'Gestão', icon: 'pi pi-chart-line', route: '/gestao' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagem-instituicao' },
    { label: 'Ranking', icon: 'pi pi-star-fill', route: '/ranking-instituicao' },
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

  constructor() {}

  ngOnInit(): void {
    // Recupera o nome da instituição do localStorage
    const nomeSalvo = localStorage.getItem('userName');
    if (nomeSalvo) {
      this.instituicaoNome = nomeSalvo; // Atualiza o nome da instituição no menu
    }
  }

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
