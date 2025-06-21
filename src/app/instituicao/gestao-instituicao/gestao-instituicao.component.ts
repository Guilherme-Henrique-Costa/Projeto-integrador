import { Component } from '@angular/core';

interface Voluntario {
  nome: string;
  email: string;
  telefone: string;
  areaInteresse: string;
  disponibilidade: string;
}

@Component({
  selector: 'app-gestao-instituicao',
  templateUrl: './gestao-instituicao.component.html',
  styleUrls: ['./gestao-instituicao.component.css']
})
export class GestaoInstituicaoComponent {
  searchQuery: string = '';
  sidebarOpen: boolean = true;
  instituicaoNome: string = 'Instituição';
  voluntarioSelecionado: Voluntario | null = null;

  sidebarItems = [
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil-instituicao' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas-instituicao' },
    { label: 'Candidatos', icon: 'pi pi-user', route: '/candidatos'},
    { label: 'Feedback', icon: 'pi pi-chart-line', route: '/feedback-instituicao' },
    { label: 'Gestão', icon: 'pi pi-chart-line', route: '/gestao' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagem-instituicao' },
    { label: 'Ranking', icon: 'pi pi-star-fill', route: '/ranking-instituicao' },
    { label: 'Relatórios', icon: 'pi pi-copy', route: '/relatorios-instituicao' },
    { label: 'Sair', icon: 'pi pi-sign-out', route: '/login-instituicao' }
  ];

  voluntarios: Voluntario[] = [
    { nome: 'Ana Souza', email: 'ana@email.com', telefone: '61 99999-1111', areaInteresse: 'Educação', disponibilidade: 'Manhãs' },
    { nome: 'Carlos Lima', email: 'carlos@email.com', telefone: '61 88888-2222', areaInteresse: 'Meio Ambiente', disponibilidade: 'Tardes' },
    { nome: 'Fernanda Rocha', email: 'fernanda@email.com', telefone: '61 77777-3333', areaInteresse: 'Saúde', disponibilidade: 'Finais de Semana' }
  ];

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  selecionarVoluntario(voluntario: Voluntario): void {
    this.voluntarioSelecionado = voluntario;
  }
}
