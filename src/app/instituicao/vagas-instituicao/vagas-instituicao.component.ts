import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { VagasInstituicaoService, VagaInstituicao } from './vagas-instituicao.service';
import { GeocodingService } from 'src/app/services/geocoding.service';

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
  instituicaoNome: string = 'Instituição';

  sidebarItems = [
    { label: 'Menu', icon: 'pi pi-compass', route: '/menu-instituicao'},
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil-instituicao' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas-instituicao' },
    { label: 'Candidatos', icon: 'pi pi-user', route: '/candidatos' },
    { label: 'Feedback', icon: 'pi pi-inbox', route: '/feedback-instituicao' },
    { label: 'Gestão', icon: 'pi pi-chart-line', route: '/gestao' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagem-instituicao' },
    { label: 'Ranking', icon: 'pi pi-star-fill', route: '/ranking-instituicao' },
    { label: 'Sair', icon: 'pi pi-sign-out', route: '/login-instituicao' },
  ];

  constructor(
    private fb: FormBuilder,
    private vagasInstituicaoService: VagasInstituicaoService,
    private router: Router,
    private messageService: MessageService,
    private geocodingService: GeocodingService,
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

  ngOnInit(): void {
    const nomeSalvo = localStorage.getItem('userName');
    if (nomeSalvo) {
      this.instituicaoNome = nomeSalvo;
    }
  }

  onSubmit(): void {
    console.log('[VagasComponent] Submissão iniciada.');

    if (this.vagaForm.valid) {
      const formValue = this.vagaForm.value;
      formValue.especificacoes = formValue.especificacoes
        .split(',')
        .map((item: string) => item.trim());

      console.log('[VagasComponent] Valores do formulário:', formValue);

      this.geocodingService.buscarCoordenadas(formValue.localidade).subscribe({
        next: (coords) => {
          console.log('[VagasComponent] Coordenadas obtidas com sucesso:', coords);

          const idInstituicao = Number(localStorage.getItem('instituicaoId'));
          if (!idInstituicao) {
            this.exibirMensagemErro('Instituição não identificada. Faça login novamente.');
            return;
          }

          const novaVaga: VagaInstituicao = {
            ...formValue,
            instituicao: { id: idInstituicao },
            latitude: coords.latitude,
            longitude: coords.longitude,
            cidade: formValue.localidade
          };

          console.log('[VagasComponent] Vaga final montada para envio:', novaVaga);

          this.vagasInstituicaoService.cadastrarVaga(novaVaga).subscribe(
            () => {
              console.log('[VagasComponent] Vaga cadastrada com sucesso.');
              this.exibirMensagemSucesso('Vaga publicada com sucesso!');
              this.vagaForm.reset();
            },
            (error) => {
              console.error('[VagasComponent] Erro ao cadastrar vaga:', error);
              this.exibirMensagemErro('Erro ao publicar a vaga. Tente novamente.');
            }
          );
        },
        error: (err) => {
          console.error('[VagasComponent] Erro ao obter coordenadas:', err);
          this.exibirMensagemErro('Endereço inválido. Verifique o campo Localidade.');
        }
      });
    } else {
      console.warn('[VagasComponent] Formulário inválido.');
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

  isFieldInvalid(field: string): boolean {
    return !!this.vagaForm.get(field)?.invalid &&
      (!!this.vagaForm.get(field)?.touched || !!this.vagaForm.get(field)?.dirty);
  }

  private getMensagemErro(): string {
    for (const field in this.vagaForm.controls) {
      const control = this.vagaForm.get(field);
      if (control?.errors?.['required']) {
        return `O campo ${this.getFieldName(field)} é obrigatório.`;
      }
    }
    return 'Por favor, corrija os erros antes de enviar.';
  }

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

  private exibirMensagemSucesso(mensagem: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: mensagem,
      styleClass: 'toast-success',
    });
  }

  private exibirMensagemErro(mensagem: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: mensagem,
      styleClass: 'toast-error',
    });
  }
}
