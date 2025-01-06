import { Component, OnInit } from '@angular/core';
import { VagasVoluntarioService, Vaga } from './vagas-voluntario.service'; // Serviço e Interface

@Component({
  selector: 'app-vagas-voluntario',
  templateUrl: './vagas-voluntario.component.html',
  styleUrls: ['./vagas-voluntario.component.css'],
})
export class VagasVoluntarioComponent implements OnInit {
  searchQuery: string = '';
  sidebarOpen: boolean = true;
  vagas: Vaga[] = [];
  vagaSelecionada: Vaga | null = null;
  voluntarioId: number = 1;
  voluntarioNome: string = 'Aluno';

  sidebarItems = [
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas' },
    { label: 'Feedback', icon: 'pi pi-chart-line', route: '/feedback' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagens' },
    { label: 'Recompensa', icon: 'pi pi-star-fill', route: '/ranking' },
    { label: 'Logout', icon: 'pi pi-sign-out', route: '/login' },
  ];

  constructor(private vagasVoluntarioService: VagasVoluntarioService) {}

  ngOnInit(): void {
    this.carregarVagasDisponiveis();
    this.recuperarDadosVoluntario();
  }

  // Alternar visibilidade da barra lateral
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // Carregar vagas disponíveis do serviço
  carregarVagasDisponiveis(): void {
    this.vagasVoluntarioService.getVagasDisponiveis().subscribe(
      (vagas) => {
        this.vagas = vagas;
        console.log('Vagas disponíveis carregadas:', vagas);
      },
      (error) => {
        console.error('Erro ao carregar vagas disponíveis:', error);
      }
    );
  }

  // Recuperar dados do voluntário do localStorage
  recuperarDadosVoluntario(): void {
    const nomeSalvo = localStorage.getItem('userName');
    this.voluntarioNome = nomeSalvo || 'Aluno';

    const idSalvo = localStorage.getItem('voluntarioId');
    if (idSalvo) {
      this.voluntarioId = parseInt(idSalvo, 10);
    }
  }

  // Selecionar uma vaga para exibir os detalhes
  selecionarVaga(vaga: Vaga): void {
    this.vagaSelecionada = vaga;
  }

  // Filtrar vagas baseadas no campo de pesquisa
  get vagasFiltradas(): Vaga[] {
    if (!this.searchQuery) return this.vagas;

    const query = this.searchQuery.toLowerCase();
    return this.vagas.filter(
      (vaga) =>
        vaga.cargo.toLowerCase().includes(query) ||
        vaga.instituicao.toLowerCase().includes(query) ||
        vaga.localidade.toLowerCase().includes(query)
    );
  }

  // Candidatar-se a uma vaga
  candidatarVaga(): void {
    if (this.vagaSelecionada) {
      const vagaId = this.vagaSelecionada.id || 0;

      this.vagasVoluntarioService.candidatarVaga(this.voluntarioId, vagaId).subscribe(
        (response) => {
          console.log('Candidatura enviada com sucesso!', response);
          alert('Candidatura realizada com sucesso!');
          this.vagaSelecionada = null;
        },
        (error) => {
          console.error('Erro ao enviar candidatura:', error);
          alert('Erro ao realizar candidatura. Tente novamente.');
        }
      );
    }
  }
}
