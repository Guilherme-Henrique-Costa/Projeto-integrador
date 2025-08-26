import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemInstituicaoService, MensagemVoluntaria } from './mensagem-instituicao.service';
import { MenuInstituicaoService } from '../menu-instituicao/menu-instituicao.service';
import { Subject, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mensagem-instituicao',
  templateUrl: './mensagem-instituicao.component.html',
  styleUrls: ['./mensagem-instituicao.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService],
})
export class MensagemInstituicaoComponent implements OnInit, OnDestroy {
  @ViewChild('chatContainer') chatContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('inputMsg') inputMsg!: ElementRef<HTMLInputElement>;

  sidebarOpen = true;
  instituicaoNome$ = this.menuService.getInstituicaoNome$();

  nomeVoluntario = '';
  novaMensagem = '';
  mensagensReais: MensagemVoluntaria[] = [];
  voluntarioId = 0;

  sending = false;
  loading = true;

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
    private readonly cdr: ChangeDetectorRef,
    private readonly toast: MessageService,
  ) {}

  ngOnInit(): void {
    this.menuService.loadFromStorage();

    this.voluntarioId = Number(this.route.snapshot.paramMap.get('id')) || 0;
    if (!this.voluntarioId) {
      this.loading = false;
      this.toast.add({ severity: 'warn', summary: 'Atenção', detail: 'Voluntário não informado.' });
      this.cdr.markForCheck();
      return;
    }

    // polling reativo a cada 3s (dispara imediato)
    timer(0, 3000)
      .pipe(
        switchMap(() => this.mensagemService.getMensagensPorVoluntario(this.voluntarioId)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (msgs) => {
          this.loading = false;
          // mantém mensagens enviadas otimisticamente (_pending) e substitui quando chegarem do backend
          const pendentes = this.mensagensReais.filter(m => m._pending);
          const recebidas = msgs ?? [];
          // se o backend já devolveu aquela mensagem (comparando timestamp/conteúdo), some com o _pending
          pendentes.forEach(p => {
            const hit = recebidas.find(r =>
              !r.ehUsuario && r.mensagemVoluntario === p.mensagemVoluntario && Math.abs(new Date(r.dataHora).getTime() - new Date(p.dataHora).getTime()) < 15000
            );
            if (hit) p._pending = false;
          });

          this.mensagensReais = [...recebidas, ...pendentes.filter(x => x._pending)]
            .sort((a,b) => +new Date(a.dataHora) - +new Date(b.dataHora));

          if (recebidas.length) this.nomeVoluntario = recebidas[0].voluntarioNome || 'Voluntário';

          this.cdr.markForCheck();
          this.scrollToBottomSoon();
        },
        error: (err) => {
          this.loading = false;
          this.toast.add({ severity: 'error', summary: 'Erro', detail: err?.message || 'Falha ao carregar mensagens' });
          this.cdr.markForCheck();
        },
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
    if (!conteudo || this.sending || !this.voluntarioId) return;

    const nomeInstituicao = localStorage.getItem('userName') || 'Instituição';

    // otimista
    const agoraIso = new Date().toISOString();
    const otimista: MensagemVoluntaria = {
      voluntarioNome: nomeInstituicao,
      mensagemVoluntario: conteudo,
      ehUsuario: false,
      dataHora: agoraIso,
      voluntario: { id: this.voluntarioId },
      _pending: true,
    };

    this.mensagensReais = [...this.mensagensReais, otimista];
    this.novaMensagem = '';
    this.sending = true;
    this.cdr.markForCheck();
    this.scrollToBottomSoon();

    this.mensagemService.enviarMensagem(otimista).subscribe({
      next: () => {
        // ficará visível até o próximo ciclo do polling, quando o _pending será substituído
        this.sending = false;
        this.cdr.markForCheck();
        this.focusInput();
      },
      error: (err) => {
        this.sending = false;
        // remove a otimista se falhar
        this.mensagensReais = this.mensagensReais.filter(m => m !== otimista);
        this.toast.add({ severity: 'error', summary: 'Erro ao enviar', detail: err?.message || 'Tente novamente.' });
        this.cdr.markForCheck();
        this.focusInput();
      },
    });
  }

  onEnter(e: KeyboardEvent) {
    e.preventDefault();
    this.enviarMensagemInstituicao();
  }

  private focusInput() {
    setTimeout(() => this.inputMsg?.nativeElement?.focus(), 0);
  }

  private scrollToBottom(): void {
    const el = this.chatContainer?.nativeElement;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }
  private scrollToBottomSoon(): void { setTimeout(() => this.scrollToBottom(), 0); }

  sair(): void {
    this.menuService.logout();
    this.router.navigate(['/login-instituicao']);
  }

  trackByMsg = (_: number, m: MensagemVoluntaria) => m.id ?? m.dataHora;
  trackByIndex = (i: number) => i;
}
