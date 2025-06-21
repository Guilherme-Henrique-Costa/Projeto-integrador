import { Component } from '@angular/core';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent {
  searchQuery: string = '';
  sidebarOpen: boolean = true;
  voluntarioNome: string = 'Aluno';

  sidebarItems = [
  { label: 'Perfil', icon: 'pi pi-user', route: '/perfil' },
  { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas' },
  { label: 'Histórico', icon: 'pi pi-history', route: '/vagas/historico' },
  { label: 'Agenda', icon: 'pi pi-calendar', route: '/agenda' },
  { label: 'Feedback', icon: 'pi pi-chart-line', route: '/feedback' },
  { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagens' },
  { label: 'Recompensa', icon: 'pi pi-star-fill', route: '/ranking' },
  { label: 'Logout', icon: 'pi pi-sign-out', route: '/login' },
];


  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  historicoVagas = [
  {
    titulo: 'Mutirão no Parque',
    data: '25/06/2025',
    descricao: 'Atividade de limpeza e plantio de árvores.',
    status: 'Concluída'
  },
  {
    titulo: 'Apoio em Escola',
    data: '15/06/2025',
    descricao: 'Auxílio em atividades recreativas com crianças.',
    status: 'Concluída'
  }
];

}
