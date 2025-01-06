import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { VagasInstituicaoService, VagaInstituicao } from './vagas-instituicao.service'; // Serviço e Interface

@Component({
  selector: 'app-vagas-instituicao',
  templateUrl: './vagas-instituicao.component.html',
  styleUrls: ['./vagas-instituicao.component.css'],
  providers: [MessageService],
})
export class VagasInstituicaoComponent {
  vagaForm: FormGroup;
  searchQuery: string = '';
  sidebarOpen: boolean = true;

  sidebarItems = [
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil-instituicao' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas-instituicao' },
    { label: 'Candidatos', icon: 'pi pi-user', route: '/candidatos' },
    { label: 'Feedback', icon: 'pi pi-chart-line', route: '/feedback-instituicao' },
    { label: 'Gestão', icon: 'pi pi-chart-line', route: '/gestao' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagens-instituicao' },
    { label: 'Ranking', icon: 'pi pi-star-fill', route: '/ranking' },
    { label: 'Relatórios', icon: 'pi pi-copy', route: '/relatorios' },
    { label: 'Sair', icon: 'pi pi-sign-out', route: '/login-instituicao' },
  ];

  constructor(
    private fb: FormBuilder,
    private vagasInstituicaoService: VagasInstituicaoService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.vagaForm = this.fb.group({
      cargo: ['', Validators.required],
      localidade: ['', Validators.required],
      descricao: ['', Validators.required],
      especificacoes: ['', Validators.required],
      tipoVaga: ['', Validators.required],
      area: ['', Validators.required],
      horario: ['', Validators.required],
      tempoVoluntariado: ['', Validators.required],
      disponibilidade: ['', Validators.required],
    });
  }

  // Submeter o formulário
  onSubmit(): void {
    if (this.vagaForm.valid) {
      const formValue = this.vagaForm.value;
      formValue.especificacoes = formValue.especificacoes
        .split(',')
        .map((item: string) => item.trim());

      const novaVaga: VagaInstituicao = {
        ...formValue,
        instituicao: { id: 1 }, // Substitua dinamicamente com o ID correto
      };

      console.log('Dados enviados:', novaVaga);

      this.vagasInstituicaoService.cadastrarVaga(novaVaga).subscribe(
        () => {
          this.exibirMensagemSucesso('Vaga publicada com sucesso!');
          this.vagaForm.reset();
        },
        (error) => {
          this.exibirMensagemErro('Erro ao publicar a vaga. Tente novamente.');
          console.error('Erro na requisição:', error);
        }
      );
    } else {
      this.exibirMensagemErro(this.getMensagemErro());
      this.vagaForm.markAllAsTouched();
    }
  }


  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  vagas(): void {
    this.router.navigate(['/menu-instituicao']);
  }

  // Verifica se um campo está inválido
  isFieldInvalid(field: string): boolean {
    return !!this.vagaForm.get(field)?.invalid &&
      (!!this.vagaForm.get(field)?.touched || !!this.vagaForm.get(field)?.dirty);
  }

  // Retorna uma mensagem de erro personalizada para um campo inválido
  private getMensagemErro(): string {
    for (const field in this.vagaForm.controls) {
      const control = this.vagaForm.get(field);
      if (control?.errors?.['required']) {
        return `O campo ${this.getFieldName(field)} é obrigatório.`;
      }
    }
    return 'Por favor, corrija os erros antes de enviar.';
  }

  // Retorna um nome amigável para os campos
  private getFieldName(field: string): string {
    const fieldNames: { [key: string]: string } = {
      cargo: 'Cargo',
      localidade: 'Localidade de Trabalho',
      descricao: 'Descrição',
      especificacoes: 'Especificações da Vaga',
      tipoVaga: 'Tipo de Vaga',
      area: 'Área de Atuação',
      horario: 'Horário',
      tempoVoluntariado: 'Tempo de Voluntariado',
      disponibilidade: 'Disponibilidade',
    };
    return fieldNames[field] || field;
  }

  // Exibe uma mensagem de sucesso
  private exibirMensagemSucesso(mensagem: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: mensagem,
      styleClass: 'toast-success',
    });
  }

  // Exibe uma mensagem de erro
  private exibirMensagemErro(mensagem: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: mensagem,
      styleClass: 'toast-error',
    });
  }
}
