import { Component } from '@angular/core';

@Component({
  selector: 'app-ranking-instituicao',
  templateUrl: './ranking-instituicao.component.html',
  styleUrls: ['./ranking-instituicao.component.css']
})
export class RankingInstituicaoComponent {
  searchQuery: string = '';
  sidebarOpen: boolean = true;

  instituicaoNome: string = 'Instituição';

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

  ranking = [
    { posicao: 1, nome: 'Fulano' },
    { posicao: 2, nome: 'Sicrano' },
    { posicao: 3, nome: 'Zé da Silva' },
    { posicao: 4, nome: 'Beltrano' },
    { posicao: 5, nome: 'Armando' }
  ];

  constructor() {}

  ngOnInit(): void {
    const nomeSalvo = localStorage.getItem('userName');
    if (nomeSalvo) {
      this.instituicaoNome = nomeSalvo;
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

}
