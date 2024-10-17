import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from './cadastro.service'; // Usamos o service para interagir com o backend
import { MenuItem, MessageService } from 'primeng/api'; // Para exibir mensagens de erro ou sucesso
import * as moment from 'moment'; // Importando Moment.js para manipulação de datas

@Component({
  selector: 'app-cadastro-componente',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [MessageService]
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  items: MenuItem[] | undefined;

  interestAreas: string[] = [
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
    private router: Router,
    private cadastroService: CadastroService, // Injeção do serviço de cadastro
    private messageService: MessageService // Para exibir mensagens de erro
  ) {
    // Criamos o formulário reativo com os campos e suas respectivas validações
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]], // Validação para nome
      email: ['', [Validators.required, Validators.email]], // Validação para e-mail
      senha: [
        '',
        [
          Validators.required,
          Validators.minLength(6), // Senha precisa ter no mínimo 6 caracteres
          Validators.pattern('^[a-zA-Z0-9!@#$%^&*()_+=-]*$') // Letras, números e caracteres especiais opcionais
        ]
      ],
      dataNascimento: ['', Validators.required], // Validação para data de nascimento
      areaInteresse: [''], // Validação para área de interesse
      competencia: [''] // Validação para competência
    });


  }

  // Função chamada ao submeter o formulário
  onSubmit(): void {
    // Pegamos a data de nascimento do formulário
    const birthDate = this.cadastroForm.get('dataNascimento')?.value;

    // Calculamos a idade usando Moment.js
    const idade = this.calcularIdade(birthDate);

    if (idade < 16) {
      // Se a idade for menor que 16, exibimos uma mensagem de erro e não prosseguimos com o cadastro
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Idade mínima para cadastro é de 16 anos.' });
      return; // Interrompe a execução se a idade for inválida
    }

    if (this.cadastroForm.valid) {
      // Se o formulário estiver válido, enviamos os dados para o backend através do serviço
      this.cadastroService.cadastrarVoluntario(this.cadastroForm.value).subscribe({
        next: (response) => {
          console.log('Cadastro realizado com sucesso:', response);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro realizado com sucesso!' });
          // Redirecionar ou mostrar uma mensagem de sucesso após o cadastro
          // Redireciona para a tela de login após o sucesso
        this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erro ao cadastrar:', err); // Mostra o erro no console
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao realizar o cadastro. Tente novamente.' });
        }
      });
    } else {
      // Se o formulário for inválido, mostramos um erro
      console.error('Formulário inválido');
    }
  }

  // Função para calcular a idade usando Moment.js
  calcularIdade(birthDate: string): number {
    return moment().diff(moment(birthDate, 'YYYY-MM-DD'), 'years'); // Calcula a diferença em anos
  }

  voltar() {
    // Função que redireciona para a tela de login caso o voluntário clique em "voltar"
    this.router.navigate(['/login']);
  }

  // Função para exibir mensagens de erro com base no campo inválido
  getErrorMessage(field: string): string {
    const control = this.cadastroForm.get(field);

    if (control?.hasError('required')) return `${this.getFieldLabel(field)} é obrigatório.`;

    if (control?.hasError('minlength')) return `O campo deve ter no mínimo ${control.errors?.['minlength'].requiredLength} caracteres.`;

    if (control?.hasError('maxlength')) return `O campo deve ter no máximo ${control.errors?.['maxlength'].requiredLength} caracteres.`;

    if (control?.hasError('pattern')) return `O formato do campo está incorreto.`;

    if (control?.hasError('email')) return `E-mail deve ser válido e conter '@'.`;

    return '';
  }

  // Função para retornar o nome amigável dos campos para exibir na mensagem de erro
  private getFieldLabel(field: string): string {
    const labels: { [key: string]: string } = {
      nome: 'Nome',
      email: 'E-mail',
      senha: 'Senha',
      dataNascimento: 'Data de Nascimento',
      areaInteresse: 'Área de Interesse',
      competencia: 'Competência'
    };
    return labels[field] || field;
  }
}
