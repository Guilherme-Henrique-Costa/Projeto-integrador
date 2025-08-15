import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemInstituicaoService, MensagemVoluntaria } from './mensagem-instituicao.service';
import { MenuInstituicaoService } from '../menu-instituicao/menu-instituicao.service';
import { Subject, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mensagem-instituicao',
  templateUrl: './mensagem-instituicao.component.html',
  styleUrls: ['./mensagem-instituicao.component.css'],
})
export class MensagemInstituicaoComponent implements OnInit, OnDestroy {
  @ViewChild('chatContainer') chatContainer!: ElementRef<HTMLDivElement>;

  sidebarOpen = true;
  instituicaoNome$ = this.menuService.getInstituicaoNome$();

  nomeVoluntario = '';
  novaMensagem = '';
  mensagensReais: MensagemVoluntaria[] = [];
  voluntarioId = 0;

  private destroy$ = new Subject<void>();

  sidebarItems = [
    { label: 'Menu', icon: 'pi pi-compass', route: '/menu-instituicao' },
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil-instituicao' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas-instituicao' },
    { label: 'Candidatos', icon: 'pi pi-user', route: '/candidatos' },
    { label: 'Feedback', icon: 'pi pi-inbox', route: '/feedback-instituicao' },
    { label: 'Gestão', icon: 'pi pi-chart-line', route: '/gestao' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagem-instituicao' },
    { label: 'Ranking', icon: 'pi pi-star-fill', route: '/ranking-instituicao' },
    { label: 'Sair', icon: 'pi pi-sign-out', route: '/login-instituicao' },
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly mensagemService: MensagemInstituicaoService,
    private readonly menuService: MenuInstituicaoService,
  ) {}

  ngOnInit(): void {
    this.menuService.loadFromStorage();

    this.voluntarioId = Number(this.route.snapshot.paramMap.get('id')) || 0;
    if (!this.voluntarioId) return;

    // polling reativo a cada 3s (já dispara imediato com 0)
    timer(0, 3000)
      .pipe(
        switchMap(() => this.mensagemService.getMensagensPorVoluntario(this.voluntarioId)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (msgs) => {
          this.mensagensReais = msgs ?? [];
          if (msgs?.length) this.nomeVoluntario = msgs[0].voluntarioNome || 'Voluntário';
          // scroll para o fim
          setTimeout(() => this.scrollToBottom(), 0);
        },
        error: (err) => console.error('Erro ao carregar mensagens', err),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  enviarMensagemInstituicao(): void {
    const conteudo = this.novaMensagem.trim();
    if (!conteudo) return;

    const nomeInstituicao = localStorage.getItem('userName') || 'Instituição';

    const nova: MensagemVoluntaria = {
      voluntarioNome: nomeInstituicao, // remetente (instituição)
      mensagemVoluntario: conteudo,
      ehUsuario: false, // false = enviado pela instituição
      dataHora: new Date().toISOString(),
      voluntario: { id: this.voluntarioId },
    };

    this.mensagemService.enviarMensagem(nova).subscribe({
      next: () => {
        this.novaMensagem = '';
        this.scrollToBottomSoon();
      },
      error: (err) => console.error('Erro ao enviar mensagem', err),
    });
  }

  private scrollToBottom(): void {
    if (!this.chatContainer) return;
    const el = this.chatContainer.nativeElement;
    el.scrollTop = el.scrollHeight;
  }

  private scrollToBottomSoon(): void {
    setTimeout(() => this.scrollToBottom(), 50);
  }

  sair(): void {
    this.menuService.logout();
    this.router.navigate(['/login-instituicao']);
  }

  trackByIndex = (i: number) => i;
}
