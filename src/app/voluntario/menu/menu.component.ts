import { Component } from '@angular/core';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  searchQuery: string = '';
  sidebarOpen: boolean = true;

  voluntarioNome: string = 'Aluno';

  sidebarItems = [
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas' },
    { label: 'Feedback', icon: 'pi pi-chart-line', route: '/feedback' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagens' },
    { label: 'Recompensa', icon: 'pi pi-star-fill', route: '/ranking' },
    { label: 'Logout', icon: 'pi pi-sign-out', route: '/login' }
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

  vagasItems = [
    { title: 'Vaga 1', description: 'Desc. da Vaga' },
    { title: 'Vaga 2', description: 'Desc. da Vaga' },
    { title: 'Vaga 3', description: 'Desc. da Vaga' },
    { title: 'Vaga 4', description: 'Desc. da Vaga' },
    { title: 'Vaga 5', description: 'Desc. da Vaga' },
    { title: 'Vaga 6', description: 'Desc. da Vaga' },
  ];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    const nomeSalvo = localStorage.getItem('userName');
    console.log('Nome salvo no localStorage:', nomeSalvo);  // Adicione isso para ver o que está sendo recuperado

    if (nomeSalvo) {
      this.voluntarioNome = nomeSalvo;
    } else {
      this.voluntarioNome = 'Aluno'; // Nome padrão caso não seja encontrado
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

  filteredVagasItems(): any[] {
    if (!this.searchQuery) return this.vagasItems;
    return this.vagasItems.filter(vaga =>
      vaga.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      vaga.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
