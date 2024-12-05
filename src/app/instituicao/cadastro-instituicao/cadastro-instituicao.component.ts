import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroInstituicaoService, Instituicao } from './cadastro-instituicao.service';
import { InstituicaoValidators } from '../../validators/instituicao-validators';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-cadastro-instituicao',
  templateUrl: './cadastro-instituicao.component.html',
  styleUrls: ['./cadastro-instituicao.component.css']
})
export class CadastroInstituicaoComponent {
  cadastroForm: FormGroup;
  items: MenuItem[] | undefined;
  forcaSenha: number = 0;

  areaAtuacao: string[] = [
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
    private cadastroService: CadastroInstituicaoService
  ) {
    this.cadastroForm = this.fb.group({
      nome: ['', InstituicaoValidators.nome],
      cnpj: ['', InstituicaoValidators.cnpj],
      email: ['', InstituicaoValidators.email],
      endereco: ['', InstituicaoValidators.endereco],
      password: ['', InstituicaoValidators.senha],
      areaAtuacao: ['', InstituicaoValidators.areaAtuacao],
      description: ['', InstituicaoValidators.descricao],
      nomeResponsavel: ['', InstituicaoValidators.nomeResponsavel],
      cpfResponsavel: ['', InstituicaoValidators.cpfResponsavel]
    });

    // Monitorar mudanças no campo de senha para calcular a força
    this.cadastroForm.get('password')?.valueChanges.subscribe(value => {
      this.forcaSenha = this.calcularForcaSenha(value);
    });
  }

  ngOnInit() {}

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      const instituicao: Instituicao = {
        nome: this.cadastroForm.value.nome,
        cnpj: this.cadastroForm.value.cnpj,
        email: this.cadastroForm.value.email,
        password: this.cadastroForm.value.password,
        areaAtuacao: this.cadastroForm.value.areaAtuacao,
        description: this.cadastroForm.value.description,
        endereco: this.cadastroForm.value.endereco,
        nomeResponsavel: this.cadastroForm.value.nomeResponsavel,
        cpfResponsavel: this.cadastroForm.value.cpfResponsavel,
      };

      console.log('Enviando dados do formulário:', instituicao);

      this.cadastroService.cadastrarInstituicao(instituicao).subscribe(
        (response: Instituicao) => {
          console.log('Instituição cadastrada com sucesso:', response);
          this.router.navigate(['/menu-instituicao']);
        },
        (error: any) => {
          console.error('Erro ao cadastrar a instituição:', error);
        }
      );
    } else {
      this.cadastroForm.markAllAsTouched();
      console.error('Formulário inválido', this.cadastroForm.value);

      Object.keys(this.cadastroForm.controls).forEach(key => {
        const control = this.cadastroForm.get(key);
        if (control?.invalid) {
          console.error(`Campo inválido: ${key}`, control.errors);
        }
      });
    }
  }

  calcularForcaSenha(senha: string): number {
    let pontuacao = 0;

    if (senha.length >= 6) {
      pontuacao += 1;
    }
    if (/[a-z]/.test(senha)) {
      pontuacao += 1;
    }
    if (/[A-Z]/.test(senha)) {
      pontuacao += 1;
    }
    if (/\d/.test(senha)) {
      pontuacao += 1;
    }
    if (/[!@#$%^&*()_+=-]/.test(senha)) {
      pontuacao += 1;
    }

    return pontuacao;
  }

  voltar(): void {
    this.router.navigate(['/login-instituicao']);
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

  private getFieldLabel(field: string): string {
    const labels: { [key: string]: string } = {
      nome: 'Nome',
      cnpj: 'CNPJ',
      email: 'E-mail',
      endereco: 'Endereço',
      password: 'Senha',
      areaAtuacao: 'Área de atuação',
      description: 'Descrição',
      nomeResponsavel: 'Nome do Responsável',
      cpfResponsavel: 'CPF do Responsável'
    };
    return labels[field] || field.charAt(0).toUpperCase() + field.slice(1);
  }
}
