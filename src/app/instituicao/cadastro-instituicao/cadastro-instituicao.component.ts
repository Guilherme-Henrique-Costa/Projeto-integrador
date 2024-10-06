import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroInstituicaoService, Instituicao } from './cadastro-instituicao.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-cadastro-instituicao',
  templateUrl: './cadastro-instituicao.component.html',
  styleUrls: ['./cadastro-instituicao.component.css']
})
export class CadastroInstituicaoComponent {
  cadastroForm: FormGroup;
  items: MenuItem[] | undefined;
  forcaSenha: number = 0; // Variável para armazenar a força da senha

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cadastroService: CadastroInstituicaoService // Injeção do serviço
  ) {
    this.cadastroForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(64),
          Validators.pattern('^[a-zA-ZÀ-ÿ\\s]*$')
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(40),
          Validators.email,
          Validators.pattern('^.{1,}@.{1,}$')
        ]
      ],
      cnpj: [
        '',
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(16),
          Validators.pattern('^[0-9]*$'),
          this.cnpjValidator
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+=-]).{8,20}$')
        ]
      ],
      interestArea: ['', Validators.required],
      competence: ['', [Validators.required, Validators.maxLength(150)]],
      description: [
        '',
        [
          Validators.maxLength(250),
          Validators.pattern('^[a-zA-ZÀ-ÿ0-9\\s.,!?]*$')
        ]
      ]
    });

    // Assinatura para monitorar mudanças no campo de senha
    this.cadastroForm.get('password')?.valueChanges.subscribe(value => {
      this.forcaSenha = this.calcularForcaSenha(value);
    });
  }

  ngOnInit() {}

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      const instituicao: Instituicao = this.cadastroForm.value;

      this.cadastroService.cadastrarInstituicao(instituicao).subscribe(
        (response) => {
          console.log('Instituição cadastrada com sucesso:', response);
          this.router.navigate(['/menu-instituicao']);
        },
        (error) => {
          console.error('Erro ao cadastrar a instituição:', error);
        }
      );
    } else {
      this.cadastroForm.markAllAsTouched();
      console.error('Formulário inválido');
    }
  }

  calcularForcaSenha(senha: string): number {
    let pontuacao = 0;

    if (senha.length >= 8) {
      pontuacao += 1;
    }
    if (/[a-z]/.test(senha)) {
      pontuacao += 1; // Letra minúscula
    }
    if (/[A-Z]/.test(senha)) {
      pontuacao += 1; // Letra maiúscula
    }
    if (/\d/.test(senha)) {
      pontuacao += 1; // Número
    }
    if (/[!@#$%^&*()_+=-]/.test(senha)) {
      pontuacao += 1; // Caractere especial
    }

    return pontuacao; // Retorna a pontuação da força da senha (0-5)
  }

  voltar(): void {
    this.router.navigate(['/login-instituicao']);
  }

  cadastrar(): void {
    this.router.navigate(['/']);
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
}
