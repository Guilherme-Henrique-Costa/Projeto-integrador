import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuInstituicaoService } from '../menu-instituicao/menu-instituicao.service';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, startWith, map } from 'rxjs';
import { FeedbackInstituicaoService, VoluntarioRef, FeedbackVoluntario } from './feedback-instituicao.service';

interface HistoricoFeedback { voluntario: string; feedbackText: string; }

@Component({
  selector: 'app-feedback-instituicao',
  templateUrl: './feedback-instituicao.component.html',
  styleUrls: ['./feedback-instituicao.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackInstituicaoComponent {
  sidebarOpen = true;
  instituicaoNome$ = this.menuService.getInstituicaoNome$();

  readonly MAX_FEEDBACK = 600;
  stars = [1, 2, 3, 4, 5];

  form: FormGroup = this.fb.group({
    voluntarioSelecionadoId: [null, [Validators.required]],
    feedbackText: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(this.MAX_FEEDBACK)]],
    colaboradorRating: [0, [Validators.min(1)]],
    sistemaRating: [0, [Validators.min(1)]],
    anonimo: [false],
  });

  voluntarioSearch = new FormControl<string>('', { nonNullable: true });
  historySearch = new FormControl<string>('', { nonNullable: true });

  private voluntarios$ = new BehaviorSubject<VoluntarioRef[]>([]);
  private history$ = new BehaviorSubject<HistoricoFeedback[]>([]);

  filteredVoluntarios$ = combineLatest([
    this.voluntarios$,
    this.voluntarioSearch.valueChanges.pipe(startWith(''))
  ]).pipe(
    map(([arr, q]) => {
      const query = (q || '').toLowerCase();
      if (!query) return arr;
      return arr.filter(v =>
        (v.nome || '').toLowerCase().includes(query) ||
        (v.emailInstitucional || '').toLowerCase().includes(query)
      );
    })
  );

  filteredHistory$ = combineLatest([
    this.history$,
    this.historySearch.valueChanges.pipe(startWith(''))
  ]).pipe(
    map(([arr, q]) => {
      const query = (q || '').toLowerCase();
      if (!query) return arr;
      return arr.filter(h =>
        h.voluntario.toLowerCase().includes(query) ||
        h.feedbackText.toLowerCase().includes(query)
      );
    })
  );

  loading = false;
  success = false;
  submitted = false;

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
    private readonly fb: FormBuilder,
    private readonly menuService: MenuInstituicaoService,
    private readonly router: Router,
    private readonly api: FeedbackInstituicaoService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.menuService.loadFromStorage();
    this.loadVoluntarios();
    this.loadHistory();
  }

  private loadVoluntarios(): void {
    this.api.listVoluntarios().subscribe({
      next: (rows) => { this.voluntarios$.next(rows || []); this.cdr.markForCheck(); },
      error: () => { this.voluntarios$.next([]); this.cdr.markForCheck(); }
    });
  }

  private loadHistory(): void {
    this.api.listAll().subscribe({
      next: (rows) => {
        const items: HistoricoFeedback[] = (rows || []).map(r => ({
          voluntario: r.voluntario?.nome || r.voluntario?.emailInstitucional || '—',
          feedbackText: r.feedback
        }));
        this.history$.next(items);
        this.cdr.markForCheck();
      },
      error: () => { this.history$.next([]); this.cdr.markForCheck(); }
    });
  }

  get feedbackLen(): number {
    return (this.form.get('feedbackText')?.value || '').length;
  }

  toggleSidebar(): void { this.sidebarOpen = !this.sidebarOpen; }

  rateColaborador(r: number): void { this.form.get('colaboradorRating')?.setValue(r); }
  rateSystem(r: number): void { this.form.get('sistemaRating')?.setValue(r); }

  submitFeedback(): void {
    this.submitted = true;

    const colab = this.form.get('colaboradorRating')?.value || 0;
    const sis = this.form.get('sistemaRating')?.value || 0;
    if (colab < 1) this.form.get('colaboradorRating')?.setErrors({ min: true });
    if (sis < 1) this.form.get('sistemaRating')?.setErrors({ min: true });
    if (this.form.invalid) return;

    const { voluntarioSelecionadoId, anonimo, feedbackText } = this.form.getRawValue();
    const payload: FeedbackVoluntario = {
      descricaoVaga: '', // se quiser vincular a uma vaga, preencher aqui
      feedback: String(feedbackText).trim(),
      voluntario: { id: Number(voluntarioSelecionadoId) }
    };

    this.loading = true;

    this.api.create(payload).subscribe({
      next: () => {
        const v = this.voluntarios$.value.find(x => x.id === Number(voluntarioSelecionadoId));
        const nome = anonimo ? 'Anônimo' : (v?.nome || v?.emailInstitucional || '—');
        const novo: HistoricoFeedback = { voluntario: nome, feedbackText: payload.feedback };
        this.history$.next([novo, ...this.history$.value]);
        this.success = true;
        setTimeout(() => (this.success = false), 2500);
        this.form.reset({ voluntarioSelecionadoId: null, feedbackText: '', colaboradorRating: 0, sistemaRating: 0, anonimo: false });
      },
      error: () => {},
      complete: () => { this.loading = false; this.cdr.markForCheck(); }
    });
  }

  sair(): void {
    this.menuService.logout();
    this.router.navigate(['/login-instituicao']);
  }

  trackByIndex = (i: number) => i;
}
