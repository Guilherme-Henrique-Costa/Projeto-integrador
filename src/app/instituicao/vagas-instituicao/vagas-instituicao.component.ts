import { Component } from '@angular/core';

@Component({
  selector: 'app-vagas-instituicao',
  templateUrl: './vagas-instituicao.component.html',
  styleUrls: ['./vagas-instituicao.component.css']
})
export class VagasInstituicaoComponent {
  searchQuery: string = '';
  sidebarOpen: boolean = true;

  sidebarItems = [
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil-instituicao' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas-instituicao' },
    { label: 'Gestão', icon: 'pi pi-chart-line', route: '/gestao' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagens-instituicao' },
    { label: 'Ranking', icon: 'pi pi-star-fill', route: '/ranking' },
    { label: 'Relatórios', icon: 'pi pi-copy', route: '/relatorios' },
    { label: 'Sair', icon: 'pi pi-sign-out', route: '/login-instituicao' }
  ];

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
