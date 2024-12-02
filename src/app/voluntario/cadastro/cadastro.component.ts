import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from './cadastro.service';
import { MenuItem, MessageService } from 'primeng/api';
import * as moment from 'moment';

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
    private cadastroService: CadastroService,
    private messageService: MessageService
  ) {
    this.cadastroForm = this.fb.group({
      matricula: ['', Validators.required],
      nome: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ ]{3,}$')]], // Permite letras, espaços e acentos
      cpf: ['', [Validators.required, Validators.pattern('\\d{11}')]], // Somente números
      emailInstitucional: ['', [Validators.required, Validators.email]], // E-mail padrão
      emailParticular: ['', Validators.email], // Opcional
      celular: ['', [Validators.required, Validators.pattern('\\d{10,11}')]], // Números de 10 ou 11 dígitos
      endereco: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ0-9, ]+$')]], // Letras, números, vírgulas e espaços
      bairro: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ ]+$')]], // Letras e espaços
      disponibilidadeHorario: ['', Validators.required],
      local: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ0-9, ]+$')]],
      horario: ['', Validators.required],
      periodoInicio: ['', Validators.required],
      periodoFim: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      areaInteresse: ['', Validators.required],
      competencia: ['', [Validators.pattern('^[a-zA-ZÀ-ÿ0-9,. ]*$')]], // Letras, números, vírgulas, pontos e espaços
      senha: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^[a-zA-Z0-9!@#$%^&*()_+=-]*$') // Letras, números e caracteres especiais
        ]
      ]
    });
  }

  onSubmit(): void {
    if (!this.cadastroForm.valid) {
      console.error('Formulário inválido:', this.cadastroForm.value);
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Formulário inválido. Preencha todos os campos corretamente.' });
      return;
    }

    const birthDate = this.cadastroForm.get('dataNascimento')?.value;
    const idade = this.calcularIdade(birthDate);

    if (idade < 16) {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Idade mínima para cadastro é de 16 anos.' });
      return;
    }

    const cpf = this.cadastroForm.get('cpf')?.value;

    this.cadastroService.verificarCpf(cpf).subscribe({
      next: (existe) => {
        if (existe) {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'O CPF já está cadastrado.' });
          this.cadastroForm.get('cpf')?.setErrors({ cpfDuplicado: true });
        } else {
          this.cadastroService.cadastrarVoluntario(this.cadastroForm.value).subscribe({
            next: (response) => {
              console.log('Cadastro realizado com sucesso:', response);
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro realizado com sucesso!' });
              this.router.navigate(['/login']);
            },
            error: (err) => {
              console.error('Erro ao cadastrar:', err);
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao realizar o cadastro. Tente novamente.' });
            },
          });
        }
      },
      error: (err) => {
        console.error('Erro ao verificar CPF:', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao verificar CPF. Tente novamente.' });
      },
    });
  }

  calcularIdade(birthDate: string): number {
    return moment().diff(moment(birthDate, 'YYYY-MM-DD'), 'years');
  }

  voltar() {
    this.router.navigate(['/login']);
  }

  getErrorMessage(field: string): string {
    const control = this.cadastroForm.get(field);

    if (control?.hasError('required')) return `${this.getFieldLabel(field)} é obrigatório.`;
    if (control?.hasError('minlength')) return `O campo deve ter no mínimo ${control.errors?.['minlength'].requiredLength} caracteres.`;
    if (control?.hasError('pattern')) return `O formato do campo está incorreto.`;
    if (control?.hasError('email')) return `E-mail deve ser válido e conter '@'.`;

    return '';
  }

  private getFieldLabel(field: string): string {
    const labels: { [key: string]: string } = {
      nome: 'Nome',
      emailInstitucional: 'E-mail Institucional',
      emailParticular: 'E-mail Particular',
      endereco: 'Endereço',
      bairro: 'Bairro',
      competencia: 'Competência',
      senha: 'Senha',
      dataNascimento: 'Data de Nascimento',
      areaInteresse: 'Área de Interesse'
    };
    return labels[field] || field;
  }
}
