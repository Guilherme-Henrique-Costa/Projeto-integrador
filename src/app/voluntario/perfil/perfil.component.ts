import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilService } from './perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  searchQuery: string = '';
  sidebarOpen: boolean = true;
  voluntarioNome: string = 'Aluno';
  perfilForm: FormGroup;

  // Lista de itens do menu lateral
  sidebarItems = [
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas' },
    { label: 'Minhas Vagas', icon: 'pi pi-briefcase', route: '/vagas/minhas-vagas' },
    { label: 'Histórico', icon: 'pi pi-history', route: '/vagas/historico' },
    { label: 'Agenda', icon: 'pi pi-calendar', route: '/agenda' },
    { label: 'Feedback', icon: 'pi pi-chart-line', route: '/feedback' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagens' },
    { label: 'Recompensa', icon: 'pi pi-star-fill', route: '/ranking' },
    { label: 'Logout', icon: 'pi pi-sign-out', route: '/login' },
  ];

  // Lista de áreas de interesse
  areasDeInteresse: string[] = [
    'Auxílio a Pessoas com Deficiência',
    'Educação e Ensino',
    'Saúde e Bem-estar',
    'Proteção Ambiental',
    'Apoio a Idosos',
    'Apoio a Crianças e Adolescentes',
    'Artes e Cultura',
    'Alimentação e Nutrição',
    'Direitos Humanos e Advocacia'
  ];

  constructor(
    private fb: FormBuilder,
    private perfilService: PerfilService
  ) {
    // Inicialização do formulário com validações
    this.perfilForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      areaInteresse: ['', Validators.required],
      disponibilidadeHorario: ['', Validators.required],
      competencia: ['']
    });
  }

  ngOnInit(): void {
    // Carrega os dados do perfil do voluntário ao iniciar o componente
    this.perfilService.getPerfilVoluntario().subscribe((data) => {
      this.perfilForm.patchValue(data); // Preenche o formulário com os dados existentes
    });
  }

  // Envia as alterações feitas no formulário
  onSubmit(): void {
    if (this.perfilForm.valid) {
      this.perfilService.updatePerfilVoluntario(this.perfilForm.value).subscribe((response) => {
        console.log('Perfil atualizado com sucesso', response);
      });
    } else {
      console.error('Formulário inválido');
      this.perfilForm.markAllAsTouched(); // Marca todos os campos como "tocados" para exibir mensagens de erro
    }
  }

  // Alterna a abertura/fechamento da barra lateral
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // Retorna mensagens de erro com base no campo
  getErrorMessage(field: string): string {
    const control = this.perfilForm.get(field);

    if (control?.hasError('required')) {
      return `${this.getFieldLabel(field)} é obrigatório.`;
    }

    if (control?.hasError('minlength')) {
      return `O campo deve ter no mínimo ${control.errors?.['minlength'].requiredLength} caracteres.`;
    }

    if (control?.hasError('maxlength')) {
      return `O campo deve ter no máximo ${control.errors?.['maxlength'].requiredLength} caracteres.`;
    }

    if (control?.hasError('pattern')) {
      return `O formato do campo está incorreto.`;
    }

    if (control?.hasError('email')) {
      return `E-mail deve ser válido e conter '@'.`;
    }

    return '';
  }

  // Define os rótulos amigáveis para os campos
  private getFieldLabel(field: string): string {
    const labels: { [key: string]: string } = {
      nome: 'Nome Completo',
      email: 'E-mail',
      celular: 'Celular',
      endereco: 'Endereço (CEP)',
      bairro: 'Bairro',
      areaInteresse: 'Áreas de Interesse',
      disponibilidadeHorario: 'Disponibilidade de Horário',
      competencia: 'Competências'
    };
    return labels[field] || field.charAt(0).toUpperCase() + field.slice(1);
  }
}
