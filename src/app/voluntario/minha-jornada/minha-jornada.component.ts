import { Component } from '@angular/core';

@Component({
  selector: 'app-minha-jornada',
  templateUrl: './minha-jornada.component.html',
  styleUrls: ['./minha-jornada.component.css']
})
export class MinhaJornadaComponent {
  sidebarOpen = true;
  voluntarioNome: string = 'Aluno';

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

  // Dados simulados
  jornadas = [
    { titulo: 'Apoio em Eventos', data: '05/02/2025', impacto: 'Organização de 3 eventos sociais com 80+ participantes.' },
    { titulo: 'Mentoria para Jovens', data: '14/03/2025', impacto: '5 mentorias individuais concluídas com sucesso.' },
    { titulo: 'Distribuição de Alimentos', data: '28/04/2025', impacto: 'Auxílio na entrega de 120 cestas básicas.' }
  ];
}
