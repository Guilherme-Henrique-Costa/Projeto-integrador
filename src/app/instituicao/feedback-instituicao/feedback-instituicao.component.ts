import { Component } from '@angular/core';

@Component({
  selector: 'app-feedback-instituicao',
  templateUrl: './feedback-instituicao.component.html',
  styleUrls: ['./feedback-instituicao.component.css']
})
export class FeedbackInstituicaoComponent {
  sidebarOpen = true;
  sidebarItems = [
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil-instituicao' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas-instituicao' },
    { label: 'Candidatos', icon: 'pi pi-user', route: '/candidatos' },
    { label: 'Feedback', icon: 'pi pi-chart-line', route: '/feedback' },
    { label: 'Gestão', icon: 'pi pi-chart-line', route: '/gestao' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagens-instituicao' },
    { label: 'Ranking', icon: 'pi pi-star-fill', route: '/ranking' },
    { label: 'Relatórios', icon: 'pi pi-copy', route: '/relatorios' },
    { label: 'Sair', icon: 'pi pi-sign-out', route: '/login-instituicao' },
  ];
  instituicaoNome = 'Instituição XYZ';
  searchQuery = '';
  feedbackText = '';
  stars = [1, 2, 3, 4, 5];
  colaboradorRating = 0; // Avaliação de colaboradores
  sistemaRating = 0; // Avaliação do sistema

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
    console.log('Feedback enviado:', {
      feedbackText: this.feedbackText,
      colaboradorRating: this.colaboradorRating,
      sistemaRating: this.sistemaRating,
    });
    alert('Feedback enviado com sucesso!');
  }

}
