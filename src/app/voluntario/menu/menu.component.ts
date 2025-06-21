import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { VagasVoluntarioService, Vaga } from '../vagas-voluntario/vagas-voluntario.service'; // Importar serviço e interface

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  searchQuery: string = '';
  sidebarOpen: boolean = true;

  voluntarioNome: string = 'Aluno';
  vagasDisponiveis: Vaga[] = []; // Lista de vagas carregadas do backend

  sidebarItems = [
  { label: 'Perfil', icon: 'pi pi-user', route: '/perfil' },
  { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas' },
  { label: 'Histórico', icon: 'pi pi-history', route: '/vagas-voluntario/historico' },
  { label: 'Agenda', icon: 'pi pi-calendar', route: '/agenda' },
  { label: 'Feedback', icon: 'pi pi-chart-line', route: '/feedback' },
  { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagens' },
  { label: 'Recompensa', icon: 'pi pi-star-fill', route: '/ranking' },
  { label: 'Logout', icon: 'pi pi-sign-out', route: '/login' },
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

  constructor(
    private menuService: MenuService,
    private vagasVoluntarioService: VagasVoluntarioService // Serviço de vagas
  ) {}

  ngOnInit(): void {
    const nomeSalvo = this.menuService.getVoluntarioNome();

    if (nomeSalvo) {
      this.voluntarioNome = nomeSalvo;
    } else {
      // Supondo que o ID do voluntário está salvo no localStorage
      const voluntarioId = localStorage.getItem('voluntarioId');
      if (voluntarioId) {
        this.menuService.fetchVoluntarioNome(+voluntarioId).subscribe((data) => {
          this.voluntarioNome = data.nome;
          this.menuService.setVoluntarioNome(data.nome); // Atualiza localmente
        });
      }
    }
  }

  // Carregar nome do voluntário do localStorage
  carregarNomeVoluntario(): void {
    const nomeSalvo = localStorage.getItem('userName');
    console.log('Nome salvo no localStorage:', nomeSalvo);

    if (nomeSalvo) {
      this.voluntarioNome = nomeSalvo;
    } else {
      this.voluntarioNome = 'Aluno'; // Nome padrão caso não seja encontrado
    }
  }

  // Alternar barra lateral
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // Carregar vagas disponíveis do backend
  carregarVagasDisponiveis(): void {
    this.vagasVoluntarioService.getVagas().subscribe(
      (vagas) => {
        this.vagasDisponiveis = vagas;
        console.log('Vagas disponíveis carregadas:', vagas);
      },
      (error) => {
        console.error('Erro ao carregar vagas:', error);
      }
    );
  }

  // Filtrar vagas disponíveis com base na pesquisa
  // Método para obter vagas filtradas com base no `searchQuery`
get vagasFiltradas(): Vaga[] {
  return this.vagasDisponiveis.filter(vaga =>
    vaga.cargo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    vaga.instituicao.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    vaga.localidade.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
}

  // Filtrar itens do ranking
  filteredRankingItems(): string[] {
    if (!this.searchQuery) return this.rankingItems;
    return this.rankingItems.filter((item) =>
      item.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Filtrar itens de feedback
  filteredFeedbackItems(): string[] {
    if (!this.searchQuery) return this.feedbackItems;
    return this.feedbackItems.filter((item) =>
      item.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
