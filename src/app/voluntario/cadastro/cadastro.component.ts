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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cadastroService: CadastroService,
    private messageService: MessageService
  ) {
    this.cadastroForm = this.fb.group({
      matricula: ['', [AngularValidators.required, Validators.matricula]],
      nome: ['', [AngularValidators.required, Validators.nomeCompleto]],
      cpf: ['', [AngularValidators.required, Validators.cpf]], // Mantive o validador do CPF básico
      dataNascimento: ['', [AngularValidators.required, Validators.idadeMinima(16)]],
      genero: ['', AngularValidators.required],
      senha: ['', [AngularValidators.required, AngularValidators.minLength(6), Validators.forcaSenha]],
      atividadeCEUB: [[], AngularValidators.required],
      atividadeOutro: ['', this.atividadeOutroValidator()],
      emailInstitucional: ['', [AngularValidators.required, AngularValidators.email, Validators.emailProvedor]],
      emailParticular: ['', AngularValidators.email],
      celular: ['', [AngularValidators.required, Validators.celular]],
      cidadeUF: ['', [AngularValidators.required]],
      disponibilidadeHorario: ['', AngularValidators.required],
      horario: ['', AngularValidators.required],
      motivacao: ['', AngularValidators.required],
      causas: [[], AngularValidators.required],
      habilidades: [[], AngularValidators.required],
      comentarios: [''],
      ...this.initDisponibilidadeHorarios()
    });
  }

  atividadeOutroValidator() {
    return (formGroup: FormGroup) => {
      const atividadeCEUB = formGroup.get('atividadeCEUB')?.value || [];
      const atividadeOutro = formGroup.get('atividadeOutro');
      if (atividadeCEUB.includes('Outro') && !atividadeOutro?.value) {
        atividadeOutro?.setErrors({ required: true });
      } else {
        atividadeOutro?.setErrors(null);
      }
    };
  }

  initDisponibilidadeHorarios() {
    const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
    const horarios: any = {};
    dias.forEach(dia => {
      horarios[dia + 'Manha'] = [false];
      horarios[dia + 'Tarde'] = [false];
      horarios[dia + 'Noite'] = [false];
      horarios[dia + 'Nenhum'] = [false];
    });
    return horarios;
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
