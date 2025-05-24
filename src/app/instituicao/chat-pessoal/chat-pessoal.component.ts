import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Mensagem {
  remetente: 'usuario' | 'instituicao';
  texto: string;
}

@Component({
  selector: 'app-chat-pessoal',
  templateUrl: './chat-pessoal.component.html',
  styleUrls: ['./chat-pessoal.component.css']
})
export class ChatPessoalComponent implements OnInit {
  searchQuery: string = '';
  sidebarOpen: boolean = true;
  nomeUsuario: string = '';
  novaMensagem: string = '';
  mensagens: Mensagem[] = [
    {
      remetente: 'usuario',
      texto: 'Olá, sou o Fulano e estou interessado em fazer trabalho voluntário. Gostaria de saber mais sobre as outras oportunidades disponíveis.'
    },
    {
      remetente: 'instituicao',
      texto: 'Olá, Fulano! Que bom saber do seu interesse! Temos várias oportunidades de voluntariado. Podemos marcar uma conversa rápida para discutir como você pode se envolver? Qual horário seria conveniente para você?'
    }
  ];

  instituicaoNome: string = 'Instituição';

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.nomeUsuario = this.route.snapshot.paramMap.get('nome') || 'Usuário';
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  enviarMensagem(): void {
    if (!this.novaMensagem.trim()) return;

    this.mensagens.push({ remetente: 'usuario', texto: this.novaMensagem });

    // Simulação de resposta automática
    setTimeout(() => {
      this.mensagens.push({
        remetente: 'instituicao',
        texto: 'Recebido! Em breve entraremos em contato com mais informações.'
      });
    }, 1000);

    this.novaMensagem = '';
  }
}
