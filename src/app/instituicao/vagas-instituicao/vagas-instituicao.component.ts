import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-vagas-instituicao',
  templateUrl: './vagas-instituicao.component.html',
  styleUrls: ['./vagas-instituicao.component.css'],
  providers: [MessageService]
})
export class VagasInstituicaoComponent {
  vagaForm: FormGroup;
  searchQuery: string = '';
  sidebarOpen: boolean = true;

  sidebarItems = [
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil-instituicao' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas-instituicao' },
    { label: 'Gestão', icon: 'pi pi-chart-line', route: '/gestao' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagens-instituicao' },
    { label: 'Ranking', icon: 'pi pi-star-fill', route: '/ranking' },
    { label: 'Relatórios', icon: 'pi pi-copy', route: '/relatorios' },
    { label: 'Sair', icon: 'pi pi-sign-out', route: '/login-instituicao' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    // Adiciona os validadores de required a todos os campos
    this.vagaForm = this.fb.group({
      cargo: ['', Validators.required],
      localidade: ['', Validators.required],
      tipoVaga: ['', Validators.required],
      descricao: ['', Validators.required],
      especificacoes: ['', Validators.required]
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // Exibe uma mensagem de erro se o campo for inválido e o usuário tentou enviar o formulário
  isFieldInvalid(field: string): boolean {
    return !!this.vagaForm.get(field)?.invalid &&
           (!!this.vagaForm.get(field)?.touched || !!this.vagaForm.get(field)?.dirty);
  }

  // Método que retorna a mensagem de erro baseada no campo que está inválido
  private getMensagemErro(): string {
    for (const field in this.vagaForm.controls) {
      const control = this.vagaForm.get(field);
      if (control?.errors?.['required']) { // Correção aqui
        return `O campo ${this.getFieldName(field)} é obrigatório.`;
      }
    }
    return 'Por favor, corrija os erros antes de enviar.';
  }

  // Método que retorna o nome amigável do campo
  private getFieldName(field: string): string {
    const fieldNames: { [key: string]: string } = {
      cargo: 'Cargo',
      localidade: 'Localidade de Trabalho',
      tipoVaga: 'Tipo de Vaga',
      descricao: 'Descrição',
      especificacoes: 'Especificações da Vaga'
    };
    return fieldNames[field] || field;
  }

  // Exibir mensagem de sucesso
  private exibirMensagemSucesso(mensagem: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: mensagem,
      styleClass: 'toast-success'
    });
  }

  // Exibir mensagem de erro
  private exibirMensagemErro(mensagem: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: mensagem,
      styleClass: 'toast-error'
    });
  }

  onSubmit(): void {
    if (this.vagaForm.valid) {
      // Exibir mensagem de sucesso se o formulário estiver válido
      this.exibirMensagemSucesso("Vaga publicada com sucesso!");

      // Lógica para registrar a vaga (pode ser uma requisição a API ou outra lógica)
      console.log(this.vagaForm.value);

      // Resetar o formulário para preparar para a próxima vaga
      this.vagaForm.reset({
        cargo: '',
        localidade: '',
        tipoVaga: '',
        descricao: '',
        especificacoes: ''
      });

    } else {
      // Exibir mensagem de erro se o formulário estiver inválido
      this.exibirMensagemErro(this.getMensagemErro());
      this.vagaForm.markAllAsTouched(); // Marcar todos os campos como 'touched' para mostrar os erros
    }
  }
}
