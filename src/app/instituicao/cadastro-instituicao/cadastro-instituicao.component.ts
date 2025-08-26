import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroInstituicaoService, Instituicao } from './cadastro-instituicao.service';
import { InstituicaoValidators } from '../../validators/instituicao-validators';
import { MessageService } from 'primeng/api';

interface OptionLV { label: string; value: string; }

@Component({
  selector: 'app-cadastro-instituicao',
  templateUrl: './cadastro-instituicao.component.html',
  styleUrls: ['./cadastro-instituicao.component.css']
})
export class CadastroInstituicaoComponent {
  cadastroForm: FormGroup;

  causasOptions: OptionLV[] = [
    'Capacitação Profissional','Combate à Pobreza','Consumo Consciente','Crianças e Jovens',
    'Cultura, Esportes e Artes','Defesa de Direitos','Educação','Idoso','Meio Ambiente',
    'Participação Cidadã','Proteção Animal','Saúde','Pessoas com Deficiência','Todas as Causas','Outro'
  ].map(v => ({ label: v, value: v }));

  habilidadesOptions: OptionLV[] = [
    'Artes/Artesanato','Comunicação','Dança/Música','Direito','Educação','Esportes',
    'Gastronomia','Gestão','Idiomas','Informática/Eletrônica','Saúde/Psicologia',
    'Todas as Habilidades','Outro'
  ].map(v => ({ label: v, value: v }));

  areaAtuacaoOptions: OptionLV[] = [
    'Assistência Social','Saúde','Educação','Cultura','Esporte','Meio Ambiente','Direitos Humanos','Tecnologia'
  ].map(v => ({ label: v, value: v }));

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly cadastroService: CadastroInstituicaoService,
    private readonly messageService: MessageService
  ) {
    this.cadastroForm = this.fb.group({
      // Dados básicos
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cnpj: ['', [Validators.required, InstituicaoValidators.cnpj]],
      email: ['', [Validators.required, Validators.email]],
      telefoneContato: ['', [Validators.required]],
      description: [''],

      // 🔹 Endereço com CEP (novos campos)
      cep: ['', [Validators.maxLength(9)]],
      endereco: ['', [Validators.required]],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cidade: [''],
      uf: ['', [Validators.maxLength(2)]],

      // Seleções (arrays)
      areaAtuacao: [[], Validators.required],
      causasApoio: [[], Validators.required],
      habilidadesRequeridas: [[], Validators.required],

      // Credenciais
      senha: ['', [Validators.required, Validators.minLength(6)]],

      // Contatos
      responsavelPreenchimento: ['', Validators.required],
      nomeContatoVoluntariado: ['', Validators.required],
      funcaoContatoVoluntariado: ['', Validators.required],
      telefoneContatoVoluntariado: ['', Validators.required],

      // Status
      semFinsLucrativos: ['', Validators.required],
      constituidaFormalmente: ['', Validators.required],
      emAtividade: ['', Validators.required],
      sedeDesvinculada: [''],
      prestadoraServicos: [''],

      // CEUB
      interesseRH: ['', Validators.required],
      prestarInfosCEUB: ['', Validators.required],
      avaliadaCEUB: ['', Validators.required],

      // Info adicionais
      motivoInteresseVoluntarios: ['', Validators.required],
      enderecoTrabalhoVoluntario: ['', Validators.required],
      horasMensaisVoluntario: ['', Validators.required],
      contatosRepassadosVoluntarios: ['', Validators.required],
      comentariosSugestoes: [''],
    });
  }

  // 🔹 ViaCEP – mesmo comportamento do perfil
  async buscarCep(): Promise<void> {
    const cepDigits = String(this.cadastroForm.get('cep')?.value || '').replace(/\D/g, '');
    if (cepDigits.length !== 8) {
      this.toast('warn', 'CEP', 'Informe um CEP válido com 8 dígitos.');
      return;
    }
    try {
      const resp = await fetch(`https://viacep.com.br/ws/${cepDigits}/json/`);
      const data = await resp.json();
      if (data?.erro) {
        this.toast('warn', 'CEP', 'CEP não encontrado.');
        return;
      }
      this.cadastroForm.patchValue({
        endereco: data.logradouro || '',
        bairro:   data.bairro || '',
        cidade:   data.localidade || '',
        uf:       data.uf || '',
      });
      this.toast('success', 'CEP', 'Endereço preenchido automaticamente.');
    } catch {
      this.toast('error', 'CEP', 'Falha ao consultar o CEP.');
    }
  }

  // Submissão final
  onSubmit(): void {
    if (this.cadastroForm.invalid) {
      this.cadastroForm.markAllAsTouched();
      this.toast('error', 'Formulário inválido', 'Revise os campos destacados.');
      this.logErros();
      return;
    }

    const instituicao: Instituicao = {
      ...this.cadastroForm.value,
    } as Instituicao;

    this.cadastroService.cadastrarInstituicao(instituicao).subscribe({
      next: () => {
        this.toast('success', 'Cadastro realizado', 'Sua instituição foi cadastrada com sucesso.');
        this.router.navigate(['/login-instituicao']);
      },
      error: (e: Error) => this.toast('error', 'Falha no cadastro', e.message)
    });
  }

  // Helpers
  private toast(severity: 'success'|'info'|'warn'|'error', summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  private logErros() {
    Object.keys(this.cadastroForm.controls).forEach(key => {
      const control = this.cadastroForm.get(key);
      if (control?.invalid) console.error(`Campo inválido: ${key}`, control.errors);
    });
  }

  getErrorMessage(field: string): string {
    const control = this.cadastroForm.get(field);
    if (!control) return '';

    if (control.hasError('required')) return `${this.getFieldLabel(field)} é obrigatório.`;
    if (control.hasError('minlength')) return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres.`;
    if (control.hasError('maxlength')) return `Máximo ${control.errors?.['maxlength'].requiredLength} caracteres.`;
    if (control.hasError('pattern')) return `Formato inválido.`;
    if (control.hasError('email')) return `Informe um e-mail válido.`;
    return '';
  }

  private getFieldLabel(field: string): string {
    const labels: Record<string, string> = {
      nome: 'Razão Social',
      cnpj: 'CNPJ',
      email: 'E-mail',
      telefoneContato: 'Telefone',
      description: 'Descrição',
      endereco: 'Endereço',
      cep: 'CEP',
      numero: 'Número',
      complemento: 'Complemento',
      bairro: 'Bairro',
      cidade: 'Cidade',
      uf: 'UF',
      senha: 'Senha',
      areaAtuacao: 'Área de atuação',
      causasApoio: 'Causas de apoio',
      habilidadesRequeridas: 'Habilidades requeridas',
      responsavelPreenchimento: 'Responsável pelo preenchimento',
      nomeContatoVoluntariado: 'Nome do contato',
      funcaoContatoVoluntariado: 'Função do contato',
      telefoneContatoVoluntariado: 'Telefone do contato',
      semFinsLucrativos: 'Sem fins lucrativos',
      constituidaFormalmente: 'Constituída formalmente',
      emAtividade: 'Em atividade',
      sedeDesvinculada: 'Sede desvinculada',
      prestadoraServicos: 'Prestadora de serviços',
      interesseRH: 'Interesse em RH voluntário',
      prestarInfosCEUB: 'Disposta a prestar informações ao CEUB',
      avaliadaCEUB: 'Disposta a ser avaliada pelo CEUB',
      motivoInteresseVoluntarios: 'Motivo do interesse por voluntários',
      enderecoTrabalhoVoluntario: 'Endereço do trabalho voluntário',
      horasMensaisVoluntario: 'Horas mensais esperadas',
      contatosRepassadosVoluntarios: 'Contatos a repassar',
      comentariosSugestoes: 'Comentários/Sugestões'
    };
    return labels[field] || field;
  }
}
