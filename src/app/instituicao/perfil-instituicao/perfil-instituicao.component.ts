import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-instituicao',
  templateUrl: './perfil-instituicao.component.html',
  styleUrls: ['./perfil-instituicao.component.css']
})
export class PerfilInstituicaoComponent {
  searchQuery: string = '';
  sidebarOpen: boolean = true;
  cadastroForm: FormGroup;

  sidebarItems = [
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil-instituicao' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas-instituicao' },
    { label: 'Gestão', icon: 'pi pi-chart-line', route: '/gestao' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagens-instituicao' },
    { label: 'Ranking', icon: 'pi pi-star-fill', route: '/ranking' },
    { label: 'Relatórios', icon: 'pi pi-copy', route: '/relatorios' },
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
  ) {
    this.cadastroForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
          Validators.pattern('^[a-zA-ZÀ-ÿ\\s]*$') // Permite letras com acentos e espaços
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(40),
          Validators.email,
          Validators.pattern('^.{1,}@.{1,}$') // Garante que o email tenha um '@'
        ]
      ],
      cnpj: [
        '',
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(16),
          Validators.pattern('^[0-9]*$'), // Aceita apenas números
          this.cnpjValidator // Validação customizada do CNPJ
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z0-9!@#$%^&*()_+=-]*$') // Permite letras, números e caracteres especiais
        ]
      ],
      interestArea: ['', Validators.required], // Obrigatório
      competence: ['', [Validators.required, Validators.maxLength(150)]],
      description: [
        '',
        [
          Validators.maxLength(250),
          Validators.pattern('^[a-zA-ZÀ-ÿ0-9\\s.,!?]*$') // Permite letras, números, acentos e alguns caracteres especiais
        ]
      ]
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      console.log(this.cadastroForm.value);
      // Lógica de submissão, como enviar para uma API.
    } else {
      this.cadastroForm.markAllAsTouched(); // Marca todos os campos como 'tocados' para mostrar as mensagens de erro.
      console.error('Formulário inválido');
    }
  }

  private cnpjValidator(control: AbstractControl): ValidationErrors | null {
    const cnpj = control.value;
    if (!cnpj) return null;

    return this.validateCnpj(cnpj) ? null : { invalidCnpj: true };
  }

  private validateCnpj(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14) return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += +numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== +digitos.charAt(0)) return false;

    tamanho++;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += +numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === +digitos.charAt(1);
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

    if (control?.hasError('invalidCnpj')) {
      return `CNPJ inválido.`;
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
      confirmPassword: 'Confirme sua senha',
      interestArea: 'Área de atuação',
      competence: 'Competência',
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
