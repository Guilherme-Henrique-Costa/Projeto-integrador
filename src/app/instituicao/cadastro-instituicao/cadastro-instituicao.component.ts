import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  steps: MenuItem[] = [];
  activeStepIndex: number = 0;

  // Opções para seleção de causas e habilidades
  causasOptions: string[] = [
    'Capacitação Profissional', 'Combate à Pobreza', 'Consumo Consciente', 'Crianças e Jovens',
    'Cultura, Esportes e Artes', 'Defesa de Direitos', 'Educação', 'Idoso', 'Meio Ambiente',
    'Participação Cidadã', 'Proteção Animal', 'Saúde', 'Pessoas com Deficiência', 'Todas as Causas', 'Outro'
  ];

  habilidadesOptions: string[] = [
    'Artes/Artesanato', 'Comunicação', 'Dança/Música', 'Direito', 'Educação', 'Esportes',
    'Gastronomia', 'Gestão', 'Idiomas', 'Informática/Eletrônica', 'Saúde/Psicologia',
    'Todas as Habilidades', 'Outro'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cadastroService: CadastroInstituicaoService
  ) {
    // Inicialização do formulário
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cnpj: ['', [Validators.required, InstituicaoValidators.cnpj]],
      email: ['', [Validators.required, Validators.email]],
      telefoneContato: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      areaAtuacao: [[], Validators.required],
      causasApoio: [[], Validators.required],
      habilidadesRequeridas: [[], Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],

      responsavelPreenchimento: ['', Validators.required],
      nomeContatoVoluntariado: ['', Validators.required],
      funcaoContatoVoluntariado: ['', Validators.required],
      telefoneContatoVoluntariado: ['', Validators.required],

      semFinsLucrativos: ['', Validators.required],
      constituidaFormalmente: ['', Validators.required],
      emAtividade: ['', Validators.required],
      sedeDesvinculada: ['', Validators.required],
      prestadoraServicos: ['', Validators.required],
      interesseRH: ['', Validators.required],
      prestarInfosCEUB: ['', Validators.required],
      avaliadaCEUB: ['', Validators.required],

      motivoInteresseVoluntarios: ['', Validators.required],
      enderecoTrabalhoVoluntario: ['', Validators.required],
      horasMensaisVoluntario: ['', Validators.required],
      contatosRepassadosVoluntarios: ['', Validators.required],
      comentariosSugestoes: [''],
    });

    // Etapas do p-steps
    this.steps = [
      { label: 'Informações Básicas' },
      { label: 'Contato Voluntariado' },
      { label: 'Status da Instituição' },
      { label: 'Relacionamento com o CEUB' },
      { label: 'Causas e Habilidades' },
      { label: 'Credenciais' },
      { label: 'Informações Adicionais' },
      { label: 'Responsável' },
    ];
  }

  // Avança para a próxima etapa se válida
  nextStep() {
    if (this.activeStepIndex < this.steps.length - 1) {
      this.activeStepIndex++;
    }
  }

  // Volta para a etapa anterior
  prevStep() {
    if (this.activeStepIndex > 0) {
      this.activeStepIndex--;
    }
  }

  // Validação da etapa atual do stepper
  isCurrentStepValid(): boolean {
    switch (this.activeStepIndex) {
      case 0:
        return (this.cadastroForm.get('nome')?.valid ?? false) &&
               (this.cadastroForm.get('cnpj')?.valid ?? false) &&
               (this.cadastroForm.get('email')?.valid ?? false) &&
               (this.cadastroForm.get('telefoneContato')?.valid ?? false) &&
               (this.cadastroForm.get('endereco')?.valid ?? false);
      case 1:
        return (this.cadastroForm.get('nomeContatoVoluntariado')?.valid ?? false) &&
               (this.cadastroForm.get('funcaoContatoVoluntariado')?.valid ?? false) &&
               (this.cadastroForm.get('telefoneContatoVoluntariado')?.valid ?? false);
      case 2:
        return (this.cadastroForm.get('semFinsLucrativos')?.valid ?? false) &&
               (this.cadastroForm.get('constituidaFormalmente')?.valid ?? false) &&
               (this.cadastroForm.get('emAtividade')?.valid ?? false) &&
               (this.cadastroForm.get('sedeDesvinculada')?.valid ?? false) &&
               (this.cadastroForm.get('prestadoraServicos')?.valid ?? false);
      case 3:
        return (this.cadastroForm.get('interesseRH')?.valid ?? false) &&
               (this.cadastroForm.get('prestarInfosCEUB')?.valid ?? false) &&
               (this.cadastroForm.get('avaliadaCEUB')?.valid ?? false);
      case 4:
        return (this.cadastroForm.get('causasApoio')?.valid ?? false) &&
               (this.cadastroForm.get('habilidadesRequeridas')?.valid ?? false);
      case 5:
        return (this.cadastroForm.get('senha')?.valid ?? false);
      case 6:
        return (this.cadastroForm.get('motivoInteresseVoluntarios')?.valid ?? false) &&
               (this.cadastroForm.get('enderecoTrabalhoVoluntario')?.valid ?? false) &&
               (this.cadastroForm.get('horasMensaisVoluntario')?.valid ?? false) &&
               (this.cadastroForm.get('contatosRepassadosVoluntarios')?.valid ?? false);
      case 7:
        return (this.cadastroForm.get('responsavelPreenchimento')?.valid ?? false);
      default:
        return false;
    }
  }

  // Submissão final do formulário
  onSubmit(): void {
    if (this.cadastroForm.valid) {
      const instituicao: Instituicao = { ...this.cadastroForm.value };
      console.log('Enviando dados do formulário:', instituicao);

      this.cadastroService.cadastrarInstituicao(instituicao).subscribe(
        response => {
          console.log('Instituição cadastrada com sucesso:', response);
          this.router.navigate(['/menu-instituicao']);
        },
        error => console.error('Erro ao cadastrar a instituição:', error)
      );
    } else {
      this.cadastroForm.markAllAsTouched();
      console.error('Formulário inválido', this.cadastroForm.value);
      this.logErros();
    }
  }

  // Log de erros no console
  private logErros() {
    Object.keys(this.cadastroForm.controls).forEach(key => {
      const control = this.cadastroForm.get(key);
      if (control?.invalid) {
        console.error(`Campo inválido: ${key}`, control.errors);
      }
    });
  }

  // Mensagens de erro para cada campo
  getErrorMessage(field: string): string {
    const control = this.cadastroForm.get(field);
    if (!control) return '';

    if (control.hasError('required')) {
      return `${this.getFieldLabel(field)} é obrigatório.`;
    }
    if (control.hasError('minlength')) {
      return `O campo deve ter no mínimo ${control.errors?.['minlength'].requiredLength} caracteres.`;
    }
    if (control.hasError('maxlength')) {
      return `O campo deve ter no máximo ${control.errors?.['maxlength'].requiredLength} caracteres.`;
    }
    if (control.hasError('pattern')) {
      return `O formato do campo está incorreto.`;
    }
    if (control.hasError('email')) {
      return `E-mail deve ser válido e conter '@'.`;
    }

    return '';
  }

  // Rótulos dos campos
  private getFieldLabel(field: string): string {
    const labels: { [key: string]: string } = {
      nome: 'Nome',
      cnpj: 'CNPJ',
      email: 'E-mail',
      telefoneContato: 'Telefone',
      endereco: 'Endereço',
      senha: 'Senha',
      areaAtuacao: 'Área de atuação',
      nomeResponsavel: 'Nome do Responsável',
      cpfResponsavel: 'CPF do Responsável',
      responsavelPreenchimento: 'Responsável pelo Preenchimento',
      nomeContatoVoluntariado: 'Nome do Contato',
      funcaoContatoVoluntariado: 'Função do Contato',
      telefoneContatoVoluntariado: 'Telefone do Contato',
      semFinsLucrativos: 'A entidade é sem fins lucrativos?',
      constituidaFormalmente: 'A entidade é constituída formalmente?',
      emAtividade: 'A entidade encontra-se em atividade?',
      sedeDesvinculada: 'A entidade tem sede desvinculada de residência familiar?',
      prestadoraServicos: 'A entidade presta serviços à comunidade?',
      interesseRH: 'A entidade tem interesse em recursos humanos voluntários?',
      prestarInfosCEUB: 'A entidade está disposta a prestar informações para o CEUB?',
      avaliadaCEUB: 'A entidade está disposta a ser avaliada pelo CEUB?',
      motivoInteresseVoluntarios: 'Por que deseja receber voluntários?',
      enderecoTrabalhoVoluntario: 'Endereço do trabalho voluntário',
      horasMensaisVoluntario: 'Horas mensais disponíveis por voluntário',
      contatosRepassadosVoluntarios: 'Contatos repassados aos voluntários',
      comentariosSugestoes: 'Comentários e sugestões'
    };
    return labels[field] || field.charAt(0).toUpperCase() + field.slice(1);
  }
}

