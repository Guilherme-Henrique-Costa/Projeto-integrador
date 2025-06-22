import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Mensagem {
  remetente: 'voluntario' | 'instituicao';
  texto: string;
}

@Component({
  selector: 'app-chat-voluntario',
  templateUrl: './chat-voluntario.component.html',
  styleUrls: ['./chat-voluntario.component.css']
})
export class ChatVoluntarioComponent implements OnInit {
  instituicaoNome: string = '';
  novaMensagem: string = '';
  mensagens: Mensagem[] = [];

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
    { label: 'Recompensa', icon: 'pi pi-star-fill', route: '/ranking' },
    { label: 'Logout', icon: 'pi pi-sign-out', route: '/login' },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.instituicaoNome = this.route.snapshot.paramMap.get('instituicao') || 'Instituição';
  }

  enviarMensagem(): void {
    if (this.novaMensagem.trim()) {
      this.mensagens.push({ remetente: 'voluntario', texto: this.novaMensagem });
      // Simula resposta automática
      this.mensagens.push({ remetente: 'instituicao', texto: 'Recebido! Em breve responderemos.' });
      this.novaMensagem = '';
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
