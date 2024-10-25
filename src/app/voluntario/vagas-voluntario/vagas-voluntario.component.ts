import { Component, OnInit } from '@angular/core';
import { VagasVoluntarioService, Vaga } from './vagas-voluntario.service';  // Importa o serviço e a interface

@Component({
  selector: 'app-vagas-voluntario',
  templateUrl: './vagas-voluntario.component.html',
  styleUrls: ['./vagas-voluntario.component.css']
})
export class VagasVoluntarioComponent implements OnInit {
  searchQuery: string = '';
  sidebarOpen: boolean = true;
  voluntarioId: number = 1;

  voluntarioNome: string = 'Aluno';

  vagas: Vaga[] = [];
  vagaSelecionada: Vaga | null = null;

  sidebarItems = [
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas' },
    { label: 'Feedback', icon: 'pi pi-chart-line', route: '/feedback' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagens' },
    { label: 'Recompensa', icon: 'pi pi-star-fill', route: '/ranking' },
    { label: 'Logout', icon: 'pi pi-sign-out', route: '/login' }
  ];

  constructor(private vagasVoluntarioService: VagasVoluntarioService) {}

  ngOnInit(): void {
    this.carregarVagas();
    const nomeSalvo = localStorage.getItem('userName');
    if (nomeSalvo) {
      this.voluntarioNome = nomeSalvo;
    } else {
      this.voluntarioNome = 'Aluno';
    }

    // Obter ID do voluntário do localStorage (caso esteja autenticado)
    const idSalvo = localStorage.getItem('voluntarioId');
    if (idSalvo) {
      this.voluntarioId = parseInt(idSalvo, 10);  // Usar ID salvo
    }
  }

  // Função para alternar a barra lateral (abrir/fechar)
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // Método que carrega as vagas do serviço
  carregarVagas(): void {
    this.vagasVoluntarioService.getVagas().subscribe(vagas => {
      this.vagas = vagas;  // Atribui as vagas recebidas à variável
      console.log('Vagas carregadas:', vagas);
    }, error => {
      console.error('Erro ao carregar vagas:', error);
    });
  }

  // Seleciona uma vaga para exibir os detalhes
  selecionarVaga(vaga: Vaga): void {
    this.vagaSelecionada = vaga;
  }

  // Função para filtrar as vagas com base na pesquisa
  get vagasFiltradas(): Vaga[] {
    return this.vagas.filter(vaga =>
      vaga.cargo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      vaga.instituicao.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      vaga.localidade.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Candidatar-se a uma vaga
  candidatarVaga(): void {
    if (this.vagaSelecionada) {
      const vagaId = this.vagaSelecionada.id || 0;

      this.vagasVoluntarioService.candidatarVaga(this.voluntarioId, vagaId).subscribe(response => {
        console.log('Candidatura enviada com sucesso!', response);
        alert('Candidatura realizada com sucesso!');
        this.vagaSelecionada = null; // Limpar seleção após candidatura
      }, error => {
        console.error('Erro ao enviar candidatura:', error);
        alert('Erro ao realizar candidatura. Tente novamente.');
      });
    }
  }
}
