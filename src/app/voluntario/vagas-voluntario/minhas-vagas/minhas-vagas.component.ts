import { Component } from '@angular/core';
import { Vaga, VagasVoluntarioService } from '../vagas-voluntario.service';

@Component({
  selector: 'app-minhas-vagas',
  templateUrl: './minhas-vagas.component.html',
  styleUrls: ['./minhas-vagas.component.css']
})
export class MinhasVagasComponent {
  minhasVagas: Vaga[] = [];
  sidebarOpen: boolean = true;
  voluntarioNome: string = 'Aluno';
  searchQuery: string = '';

  sidebarItems = [
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas' },
    { label: 'Minhas Vagas', icon: 'pi pi-briefcase', route: '/vagas/minhas-vagas' },
    { label: 'Histórico', icon: 'pi pi-history', route: '/vagas/historico' },
    { label: 'Agenda', icon: 'pi pi-calendar', route: '/agenda' },
    { label: 'Feedback', icon: 'pi pi-chart-line', route: '/feedback' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagens' },
    { label: 'Recompensa', icon: 'pi pi-star-fill', route: '/ranking' },
    { label: 'Logout', icon: 'pi pi-sign-out', route: '/login' },
  ];

  constructor(private vagasVoluntarioService: VagasVoluntarioService) {}

  ngOnInit(): void {
    this.recuperarDadosVoluntario();
    this.carregarMinhasVagas();
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  recuperarDadosVoluntario(): void {
    const nomeSalvo = localStorage.getItem('userName');
    this.voluntarioNome = nomeSalvo || 'Aluno';
  }

  carregarMinhasVagas(): void {
    const voluntarioId = localStorage.getItem('voluntarioId');
    if (voluntarioId) {
      this.vagasVoluntarioService.getMinhasVagas(+voluntarioId).subscribe(
        (vagas) => {
          this.minhasVagas = vagas;
        },
        (error) => {
          console.error('Erro ao carregar minhas vagas:', error);
        }
      );
    }
  }

  get vagasFiltradas(): Vaga[] {
    if (!this.searchQuery) return this.minhasVagas;
    const query = this.searchQuery.toLowerCase();
    return this.minhasVagas.filter(
      vaga =>
        vaga.cargo.toLowerCase().includes(query) ||
        vaga.instituicao.toLowerCase().includes(query) ||
        vaga.localidade.toLowerCase().includes(query)
    );
  }
}
