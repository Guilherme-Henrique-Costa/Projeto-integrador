import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuInstituicaoService } from '../menu-instituicao/menu-instituicao.service';
import { Router } from '@angular/router';

interface Voluntario { id: number; nome: string; }
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

  form: FormGroup = this.fb.group({
    voluntarioSelecionadoId: [null, [Validators.required]],
    feedbackText: ['', [Validators.required, Validators.minLength(3)]],
    colaboradorRating: [0, [Validators.min(1)]],
    sistemaRating: [0, [Validators.min(1)]],
    anonimo: [false],
  });

  stars = [1, 2, 3, 4, 5];
  voluntarios: Voluntario[] = [
    { id: 1, nome: 'Guilherme Silva' },
    { id: 2, nome: 'Vinícius Andrade' },
    { id: 3, nome: 'Sergio Lima' },
  ];

  loading = false;
  success = false;
  submitted = false;

  feedbacks: HistoricoFeedback[] = [];

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
  ) {}

  ngOnInit(): void {
    this.menuService.loadFromStorage();

    const stored = localStorage.getItem('feedbacks');
    if (stored) this.feedbacks = JSON.parse(stored) as HistoricoFeedback[];

    // Pré-seleciona “Selecione” como null
    this.form.get('voluntarioSelecionadoId')?.setValue(null);
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  rateColaborador(r: number): void {
    this.form.get('colaboradorRating')?.setValue(r);
  }

  rateSystem(r: number): void {
    this.form.get('sistemaRating')?.setValue(r);
  }

  submitFeedback(): void {
    this.submitted = true;

    // validações manuais para ratings mínimos
    const colab = this.form.get('colaboradorRating')?.value || 0;
    const sis = this.form.get('sistemaRating')?.value || 0;
    if (colab < 1) this.form.get('colaboradorRating')?.setErrors({ min: true });
    if (sis < 1) this.form.get('sistemaRating')?.setErrors({ min: true });

    if (this.form.invalid) return;

    this.loading = true;

    setTimeout(() => {
      const { voluntarioSelecionadoId, anonimo, feedbackText } = this.form.getRawValue();
      const voluntario = this.voluntarios.find(v => v.id === voluntarioSelecionadoId);
      const nome = anonimo ? 'Anônimo' : voluntario?.nome ?? '';

      const novo: HistoricoFeedback = { voluntario: nome, feedbackText };
      this.feedbacks = [novo, ...this.feedbacks];
      localStorage.setItem('feedbacks', JSON.stringify(this.feedbacks));

      this.success = true;
      this.loading = false;

      setTimeout(() => (this.success = false), 3000);
      this.submitted = false;
      this.form.reset({ voluntarioSelecionadoId: null, feedbackText: '', colaboradorRating: 0, sistemaRating: 0, anonimo: false });
    }, 800);
  }

  sair(): void {
    this.menuService.logout();
    this.router.navigate(['/login-instituicao']);
  }

  trackByIndex = (i: number) => i;
}
