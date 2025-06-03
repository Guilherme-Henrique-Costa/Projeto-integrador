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

  causasOptions = [
    'Capacitação Profissional',
    'Combate à Pobreza',
    'Consumo Consciente',
    'Crianças e Jovens',
    'Cultura, Esportes e Artes',
    'Defesa de Direitos',
    'Educação',
    'Idoso',
    'Meio Ambiente',
    'Participação Cidadã',
    'Proteção Animal',
    'Saúde',
    'Pessoas com Deficiência',
    'Todas as Causas'
  ];
  habilidadesOptions = [
    'Artes/Artesanato',
    'Comunicação',
    'Dança/Música',
    'Direito',
    'Educação',
    'Esportes',
    'Gastronomia',
    'Gestão',
    'Idiomas',
    'Informática/Eletrônica',
    'Saúde/Psicologia',
    'Todas as Habilidades'
  ];

  diasHorasOptions = [
    { label: 'Segunda - Manhã', value: 'Segunda-Manha' },
    { label: 'Segunda - Tarde', value: 'Segunda-Tarde' },
    { label: 'Segunda - Noite', value: 'Segunda-Noite' },
    { label: 'Terça - Manhã', value: 'Terça-Manha' },
    { label: 'Terça - Tarde', value: 'Terça-Tarde' },
    { label: 'Terça - Noite', value: 'Terça-Noite' },
    { label: 'Quarta - Manhã', value: 'Quarta-Manha' },
    { label: 'Quarta - Tarde', value: 'Quarta-Tarde' },
    { label: 'Quarta - Noite', value: 'Quarta-Noite' },
    { label: 'Quinta - Manhã', value: 'Quinta-Manha' },
    { label: 'Quinta - Tarde', value: 'Quinta-Tarde' },
    { label: 'Quinta - Noite', value: 'Quinta-Noite' },
    { label: 'Sexta - Manhã', value: 'Sexta-Manha' },
    { label: 'Sexta - Tarde', value: 'Sexta-Tarde' },
    { label: 'Sexta - Noite', value: 'Sexta-Noite' },
    { label: 'Sábado - Manhã', value: 'Sábado-Manha' },
    { label: 'Sábado - Tarde', value: 'Sábado-Tarde' },
    { label: 'Sábado - Noite', value: 'Sábado-Noite' },
    { label: 'Domingo - Manhã', value: 'Domingo-Manha' },
    { label: 'Domingo - Tarde', value: 'Domingo-Tarde' },
    { label: 'Domingo - Noite', value: 'Domingo-Noite' }
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
      dataNascimento: ['', [AngularValidators.required, Validators.idadeMinima(16)]],
      genero: ['', AngularValidators.required],
      senha: ['', [AngularValidators.required, AngularValidators.minLength(6), Validators.forcaSenha]],
      atividadeCEUB: [[], AngularValidators.required],
      emailInstitucional: ['', [AngularValidators.required, AngularValidators.email, Validators.emailProvedor]],
      emailParticular: ['', AngularValidators.email],
      celular: ['', [AngularValidators.required, Validators.celular]],
      cidadeUF: ['', AngularValidators.required],
      horario: ['', AngularValidators.required],
      motivacao: ['', AngularValidators.required],
      causas: [[], AngularValidators.required],
      habilidades: [[], AngularValidators.required],
      comentarios: [''],
      disponibilidadeSemanal: [[], AngularValidators.required]
    });
  }

  onSubmit(): void {
    if (!this.cadastroForm.valid) {
      this.cadastroForm.markAllAsTouched();
      Object.keys(this.cadastroForm.controls).forEach(key => {
        const control = this.cadastroForm.get(key);
        if (control?.invalid) {
          console.warn(`Campo inválido: ${key}`, control.errors);
        }
      });
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
