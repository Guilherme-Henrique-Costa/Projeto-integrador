import { Component } from '@angular/core';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css']
})
export class MensagemComponent {
  sidebarOpen = true;
  searchQuery: string = '';
  voluntarioNome: string = 'Aluno'; // pode ser carregado via localStorage

  instituicoes: string[] = [
    'Instituição 1', 'Instituição 2', 'Instituição 3',
    'Instituição 4', 'Instituição 5', 'Instituição 6'
  ];

  sidebarItems = [
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas' },
    { label: 'Minhas Vagas', icon: 'pi pi-briefcase', route: '/vagas/minhas-vagas' },
    { label: 'Histórico', icon: 'pi pi-history', route: '/vagas/historico' },
    { label: 'Agenda', icon: 'pi pi-calendar', route: '/agenda' },
    { label: 'Feedback', icon: 'pi pi-chart-line', route: '/feedback' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagens' },
    { label: 'Recompensa', icon: 'pi pi-star-fill', route: '/recompensa' },
    { label: 'Certificados', icon: 'pi pi-file', route: '/certificados' },
    { label: 'Minha Jornada', icon: 'pi pi-map-marker', route: '/minha-jornada' },
    { label: 'Logout', icon: 'pi pi-sign-out', route: '/login' }
  
  ];

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

}
