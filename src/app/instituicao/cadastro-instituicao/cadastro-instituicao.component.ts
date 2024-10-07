import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroInstituicaoService, PerfilInstituicao } from './cadastro-instituicao.service';
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
    // Definição do formulário com validações
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
          Validators.email,
          Validators.maxLength(40)
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
      description: [
        '',
        [
          Validators.maxLength(250),
          Validators.pattern('^[a-zA-ZÀ-ÿ0-9\\s.,!?]*$')
        ]
      ]
    });

    // Monitorar mudanças no campo de senha para calcular a força
    this.cadastroForm.get('password')?.valueChanges.subscribe(value => {
      this.forcaSenha = this.calcularForcaSenha(value);
    });
  }

  ngOnInit() {}

  // Método para submeter o formulário
  onSubmit(): void {
    if (this.cadastroForm.valid) {
      const instituicao: PerfilInstituicao = this.cadastroForm.value;

      console.log('Deu erro aqui')
      // Chamando o serviço para cadastrar a instituição
      this.cadastroService.cadastrarPerfilInstituicao(instituicao).subscribe(
        (response: PerfilInstituicao) => {
          console.log('Instituição cadastrada com sucesso:', response);
          // Redireciona para o menu após cadastro bem-sucedido
          this.router.navigate(['/menu-instituicao']);
        },
        (error: any) => {
          console.error('Erro ao cadastrar a instituição:', error);
        }
      );
    } else {
      // Marca todos os campos como tocados para exibir os erros
      this.cadastroForm.markAllAsTouched();
      console.error('Formulário inválido', this.cadastroForm.value);
    }
  }

  // Método para calcular a força da senha
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

  // Método para voltar à tela de login
  voltar(): void {
    this.router.navigate(['/login-instituicao']);
  }

  // Método para obter a mensagem de erro apropriada para cada campo
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

  // Método auxiliar para obter o rótulo de cada campo
  private getFieldLabel(field: string): string {
    const labels: { [key: string]: string } = {
      name: 'Nome',
      email: 'E-mail',
      password: 'Senha',
      interestArea: 'Área de atuação',
      competence: 'Competência',
      description: 'Descrição'
    };
    return labels[field] || field.charAt(0).toUpperCase() + field.slice(1);
  }
}
