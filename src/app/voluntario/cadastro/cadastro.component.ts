import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators as AngularValidators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from './cadastro.service';
import { MessageService } from 'primeng/api';
import { Validators } from '../../validators/validators';

@Component({
  selector: 'app-cadastro-componente',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [MessageService]
})
export class CadastroComponent {
  cadastroForm: FormGroup;

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
      matricula: ['', [AngularValidators.required, Validators.matricula]],
      nome: ['', [AngularValidators.required, Validators.nomeCompleto]],
      cpf: ['', [AngularValidators.required, Validators.cpf]],
      emailInstitucional: ['', [AngularValidators.required, AngularValidators.email, Validators.emailProvedor]],
      emailParticular: ['', AngularValidators.email],
      celular: ['', [AngularValidators.required, Validators.celular]],
      endereco: ['', [AngularValidators.required, Validators.endereco]],
      bairro: ['', [AngularValidators.required, Validators.bairro]],
      local: ['', AngularValidators.required],
      disponibilidadeHorario: ['', AngularValidators.required],
      horario: ['', AngularValidators.required],
      areaInteresse: ['', AngularValidators.required],
      periodoInicio: ['', AngularValidators.required],
      periodoFim: ['', AngularValidators.required],
      competencia: ['', [AngularValidators.required, Validators.competenciaValida]],
      senha: ['', [AngularValidators.required, AngularValidators.minLength(6), Validators.forcaSenha]],
      dataNascimento: ['', [AngularValidators.required, Validators.idadeMinima(16)]]
    },
    {
      validators: [
        Validators.periodoValido('periodoInicio', 'periodoFim') // Validador para validar períodos
      ]
    }
  );
  }

  onSubmit(): void {
    if (!this.cadastroForm.valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Formulário inválido. Preencha todos os campos corretamente.'
      });
      return;
    }

    this.cadastroService.cadastrarVoluntario(this.cadastroForm.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Cadastro realizado com sucesso!'
        });
        this.router.navigate(['/login']);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Ocorreu um erro ao realizar o cadastro. Tente novamente.'
        });
      }
    });
  }
}
