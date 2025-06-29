import { Component, OnInit } from '@angular/core';
import { CandidatosService, Candidatura, Vaga } from './candidatos.service';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.css']
})
export class CandidatosComponent implements OnInit {
  searchQuery: string = '';
  sidebarOpen: boolean = true;
  candidatos: Candidatura[] = [];
  vagasComCandidatos: Vaga[] = [];
  vagaSelecionada: Vaga | null = null;

  sidebarItems = [
    { label: 'Menu', icon: 'pi pi-compass', route: '/menu-instituicao'},
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil-instituicao' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas-instituicao' },
    { label: 'Candidatos', icon: 'pi pi-user', route: '/candidatos' },
    { label: 'Feedback', icon: 'pi pi-inbox', route: '/feedback-instituicao'},
    { label: 'Gestão', icon: 'pi pi-chart-line', route: '/gestao' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagem-instituicao' },
    { label: 'Ranking', icon: 'pi pi-star-fill', route: '/ranking-instituicao' },
    { label: 'Sair', icon: 'pi pi-sign-out', route: '/login-instituicao' }
  ];

  constructor(private candidatosService: CandidatosService) { }

  ngOnInit(): void {
    this.carregarVagasComCandidatos();
  }

  carregarVagasComCandidatos(): void {
    this.candidatosService.listarVagasComCandidatos().subscribe(vagas => {
      this.vagasComCandidatos = vagas;
    }, error => {
      console.error('Erro ao carregar vagas com candidatos:', error);
    });
  }

  selecionarVaga(vaga: Vaga): void {
    this.vagaSelecionada = vaga;
    this.carregarCandidatos(vaga.id);
  }

  carregarCandidatos(vagaId: number): void {
    this.candidatosService.listarCandidatos(vagaId).subscribe(candidatos => {
      this.candidatos = candidatos;
    }, error => {
      console.error('Erro ao carregar candidatos:', error);
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
