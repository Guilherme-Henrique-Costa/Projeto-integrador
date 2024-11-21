import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  searchQuery: string = '';
  sidebarOpen: boolean = true;

  voluntarioNome: string = 'Aluno';

  sidebarItems = [
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas' },
    { label: 'Feedback', icon: 'pi pi-chart-line', route: '/feedback' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagens' },
    { label: 'Recompensa', icon: 'pi pi-star-fill', route: '/ranking' },
    { label: 'Logout', icon: 'pi pi-sign-out', route: '/login' }
  ];

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

}
