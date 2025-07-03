import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-instituicao',
  templateUrl: './feedback-instituicao.component.html',
  styleUrls: ['./feedback-instituicao.component.css']
})
export class FeedbackInstituicaoComponent implements OnInit {
  sidebarOpen = true;
  sidebarItems = [
    { label: 'Menu', icon: 'pi pi-compass', route: '/menu-instituicao'},
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil-instituicao' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas-instituicao' },
    { label: 'Candidatos', icon: 'pi pi-user', route: '/candidatos' },
    { label: 'Feedback', icon: 'pi pi-inbox', route: '/feedback-instituicao'},
    { label: 'Gestão', icon: 'pi pi-chart-line', route: '/gestao' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagem-instituicao' },
    { label: 'Ranking', icon: 'pi pi-star-fill', route: '/ranking-instituicao' },
    { label: 'Sair', icon: 'pi pi-sign-out', route: '/login-instituicao' },
  ];

  instituicaoNome = 'Instituição XYZ';

  feedbackText = '';
  colaboradorRating = 0;
  sistemaRating = 0;
  stars = [1, 2, 3, 4, 5];

  voluntarios = [
    { id: 1, nome: 'Guilherme Silva' },
    { id: 2, nome: 'Vinícius Andrade' },
    { id: 3, nome: 'Sergio Lima' }
  ];
  voluntarioSelecionadoId: number | null = null;
  anonimo = false;

  submitted = false;
  success = false;
  loading = false;

  feedbacks: { voluntario: string; feedbackText: string }[] = [];

  ngOnInit(): void {
    const stored = localStorage.getItem('feedbacks');
    if (stored) this.feedbacks = JSON.parse(stored);
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  rateColaborador(rating: number): void {
    this.colaboradorRating = rating;
  }

  rateSystem(rating: number): void {
    this.sistemaRating = rating;
  }

  submitFeedback(): void {
    this.submitted = true;

    if (!this.voluntarioSelecionadoId || !this.feedbackText || !this.colaboradorRating || !this.sistemaRating) {
      return;
    }

    this.loading = true;

    setTimeout(() => {
      const voluntario = this.voluntarios.find(v => v.id === this.voluntarioSelecionadoId);
      const nome = this.anonimo ? 'Anônimo' : voluntario?.nome;

      const feedback = {
        voluntario: nome || '',
        feedbackText: this.feedbackText,
      };

      this.feedbacks.unshift(feedback);
      localStorage.setItem('feedbacks', JSON.stringify(this.feedbacks));

      this.success = true;
      this.loading = false;

      setTimeout(() => (this.success = false), 3000);

      this.feedbackText = '';
      this.colaboradorRating = 0;
      this.sistemaRating = 0;
      this.voluntarioSelecionadoId = null;
      this.anonimo = false;
      this.submitted = false;
    }, 1000);
  }
}
