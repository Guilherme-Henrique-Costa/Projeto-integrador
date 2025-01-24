import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PerfilInstituicao, PerfilInstituicaoService } from './perfil-instituicao.service';

@Component({
  selector: 'app-perfil-instituicao',
  templateUrl: './perfil-instituicao.component.html',
  styleUrls: ['./perfil-instituicao.component.css']
})
export class PerfilInstituicaoComponent {
  searchQuery: string = '';
  sidebarOpen: boolean = true;
  cadastroForm: FormGroup;

  instituicaoNome: string = 'Instituição'; // Nome padrão, será substituído após o login

  sidebarItems = [
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil-instituicao' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas-instituicao' },
    { label: 'Candidatos', icon: 'pi pi-user', route: '/candidatos' },
    { label: 'Feedback', icon: 'pi pi-chart-line', route: '/feedback-instituicao'},
    { label: 'Gestão', icon: 'pi pi-chart-line', route: '/gestao' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagem-instituicao' },
    { label: 'Ranking', icon: 'pi pi-star-fill', route: '/ranking-instituicao' },
    { label: 'Relatórios', icon: 'pi pi-copy', route: '/relatorios-instituicao' },
    { label: 'Sair', icon: 'pi pi-sign-out', route: '/login-instituicao' }
  ];

  interestAreas: string[] = [
    'Auxilio a Pessoas com Deficiência',
    'Educação e Ensino',
    'Saúde e Bem-estar',
    'Proteção Ambiental',
    'Apoio a Idosos',
    'Apoio a Crianças e Adolescentes',
    'Artes e Cultura',
    'Alimentação e Nutrição',
    'Direitos Humanos e Advocacia'
  ];

  constructor(private fb: FormBuilder,
    private router: Router,
    private perfilInstituicaoService: PerfilInstituicaoService
  ) {
    this.cadastroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
      cnpj: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(16)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      interestArea: ['', Validators.required], // Obrigatório
      description: ['', [Validators.maxLength(250)]]
    });
  }

  ngOnInit(): void {
    // Recupera o nome da instituição do localStorage
    const nomeSalvo = localStorage.getItem('userName');
    if (nomeSalvo) {
      this.instituicaoNome = nomeSalvo; // Atualiza o nome da instituição no menu
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      const perfilInstituicao: PerfilInstituicao = this.cadastroForm.value;

      if (perfilInstituicao.id) {
        // Se o perfil já existir, chama o método de atualização
        this.perfilInstituicaoService.update(perfilInstituicao.id, perfilInstituicao).subscribe(
          response => {
            console.log('Perfil atualizado com sucesso:', response);
            this.router.navigate(['/menu-instituicao']);
          },
          error => {
            console.error('Erro ao atualizar o perfil:', error);
          }
        );
      } else {
        // Caso contrário, cria um novo perfil
        this.perfilInstituicaoService.create(perfilInstituicao).subscribe(
          response => {
            console.log('Perfil criado com sucesso:', response);
            this.router.navigate(['/menu-instituicao']);
          },
          error => {
            console.error('Erro ao criar o perfil:', error);
          }
        );
      }
    } else {
      this.cadastroForm.markAllAsTouched();
      console.error('Formulário inválido');
    }
  }

  getErrorMessage(field: string): string {
    const control = this.cadastroForm.get(field);

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

  // Método auxiliar para gerar o rótulo correto dos campos
  private getFieldLabel(field: string): string {
    const labels: { [key: string]: string } = {
      name: 'Nome',
      email: 'E-mail',
      cnpj: 'CNPJ',
      password: 'Senha',
      interestArea: 'Área de atuação',
      description: 'Descrição'
    };
    return labels[field] || field.charAt(0).toUpperCase() + field.slice(1);
  }

  perfil(): void {
    this.router.navigate(['/menu-instituicao']);
  }

  salvar(): void {
    this.router.navigate(['/menu-instituicao']);
  }
}
