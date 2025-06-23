import { Component } from '@angular/core';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent {
  sidebarOpen = true;
  voluntarioNome = 'Fulano';

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

  certificados = [
    {
      titulo: 'Apoio em Evento Comunitário',
      data: '10/03/2025',
      instituicao: 'Instituto Esperança',
      url: 'https://example.com/certificado1.pdf'
    },
    {
      titulo: 'Voluntário de Comunicação',
      data: '25/04/2025',
      instituicao: 'Projeto Vozes',
      url: 'https://example.com/certificado2.pdf'
    }
  ];

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  visualizarCertificado(url: string): void {
    window.open(url, '_blank');
  }
}
