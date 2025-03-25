import { Component } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  stars: number[] = [1, 2, 3, 4, 5];
  institutionRating: number = 0;
  systemRating: number = 0;
  feedbackText: string = '';
  searchQuery: string = '';
  sidebarOpen: boolean = true;

  voluntarioNome: string = 'Aluno';

  necessidades: string = '';
  atividades: string = '';
  desafios: string = '';
  horarios: string = '';
  impacto: string = '';

  sidebarItems = [
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas' },
    { label: 'Feedback', icon: 'pi pi-chart-line', route: '/feedback' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagens' },
    { label: 'Recompensa', icon: 'pi pi-star-fill', route: '/ranking' },
    { label: 'Logout', icon: 'pi pi-sign-out', route: '/login' }
  ];

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // Define a avaliação da instituição
  rateInstitution(rating: number): void {
    this.institutionRating = rating;
  }

  // Define a avaliação do sistema
  rateSystem(rating: number): void {
    this.systemRating = rating;
  }

  // Função para enviar o feedback
  submitFeedback(): void {
    console.log('Feedback enviado:', {
      feedbackText: this.feedbackText,
      institutionRating: this.institutionRating,
      systemRating: this.systemRating,
      necessidades: this.necessidades,
      atividades: this.atividades,
      desafios: this.desafios,
      horarios: this.horarios,
      impacto: this.impacto
    });
    alert('Feedback enviado com sucesso!');
  }
}
