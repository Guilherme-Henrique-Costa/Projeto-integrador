import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MensagemInstituicaoService, MensagemVoluntaria } from './mensagem-instituicao.service';


@Component({
  selector: 'app-mensagem-instituicao',
  templateUrl: './mensagem-instituicao.component.html',
  styleUrls: ['./mensagem-instituicao.component.css']
})
export class MensagemInstituicaoComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  sidebarOpen: boolean = true;
  instituicaoNome: string = 'Instituição';
  nomeVoluntario: string = '';
  novaMensagem: string = '';
  mensagensReais: MensagemVoluntaria[] = [];
  voluntarioId: number = 0;
  intervalId: any;

  sidebarItems = [
    { label: 'Menu', icon: 'pi pi-compass', route: '/menu-instituicao'},
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil-instituicao' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas-instituicao' },
    { label: 'Candidatos', icon: 'pi pi-user', route: '/candidatos'},
    { label: 'Feedback', icon: 'pi pi-inbox', route: '/feedback-instituicao' },
    { label: 'Gestão', icon: 'pi pi-chart-line', route: '/gestao' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagem-instituicao' },
    { label: 'Ranking', icon: 'pi pi-star-fill', route: '/ranking-instituicao' },
    { label: 'Sair', icon: 'pi pi-sign-out', route: '/login-instituicao' }
  ];

  constructor(
    private route: ActivatedRoute,
    private mensagemService: MensagemInstituicaoService
  ) {}

  ngOnInit(): void {
    const nomeSalvo = localStorage.getItem('userName');
    if (nomeSalvo) this.instituicaoNome = nomeSalvo;

    this.voluntarioId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(this.voluntarioId)) {
      this.carregarMensagens();
      this.intervalId = setInterval(() => this.carregarMensagens(), 3000);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  carregarMensagens(): void {
  this.mensagemService.getMensagensPorVoluntario(this.voluntarioId).subscribe({
    next: (msgs: MensagemVoluntaria[]) => {
      this.mensagensReais = msgs;

      if (msgs.length > 0) {
        this.nomeVoluntario = msgs[0].voluntarioNome; // ✅ direto do JSON
      }
    },
    error: (err: any) => console.error('Erro ao carregar mensagens', err)
  });
}

  enviarMensagemInstituicao(): void {
    if (!this.novaMensagem.trim()) return;

    const nova: MensagemVoluntaria = {
      voluntarioNome: this.instituicaoNome,
      mensagemVoluntario: this.novaMensagem,
      ehUsuario: false,
      dataHora: new Date().toISOString(),
      voluntario: { id: this.voluntarioId }
    };

    this.mensagemService.enviarMensagem(nova).subscribe({
  next: () => {
    this.novaMensagem = '';
    this.carregarMensagens();
  },
  error: (err: any) => console.error('Erro ao enviar mensagem', err)
});

  }
}
