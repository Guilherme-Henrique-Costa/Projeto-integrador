import { Component } from '@angular/core';

@Component({
  selector: 'app-gestao-instituicao',
  templateUrl: './gestao-instituicao.component.html',
  styleUrls: ['./gestao-instituicao.component.css']
})
export class GestaoInstituicaoComponent {
  searchQuery: string = '';
  sidebarOpen: boolean = true;

  instituicaoNome: string = 'Instituição'; // Nome padrão, será substituído após o login

  sidebarItems = [
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil-instituicao' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas-instituicao' },
    { label: 'Candidatos', icon: 'pi pi-user', route: '/candidatos'},
    { label: 'Feedback', icon: 'pi pi-chart-line', route: '/feedback-instituicao' },
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
