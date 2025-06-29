import { Component } from '@angular/core';

@Component({
  selector: 'app-feedback-instituicao',
  templateUrl: './feedback-instituicao.component.html',
  styleUrls: ['./feedback-instituicao.component.css']
})
export class FeedbackInstituicaoComponent {
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
