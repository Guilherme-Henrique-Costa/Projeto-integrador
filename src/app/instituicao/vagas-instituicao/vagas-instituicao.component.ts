import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { VagasInstituicaoService, VagaInstituicao } from './vagas-instituicao.service';
import { GeocodingService } from 'src/app/services/geocoding.service';
import { MenuInstituicaoService } from '../menu-instituicao/menu-instituicao.service';

interface Coords { latitude: number; longitude: number; }

@Component({
  selector: 'app-vagas-instituicao',
  templateUrl: './vagas-instituicao.component.html',
  styleUrls: ['./vagas-instituicao.component.css'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VagasInstituicaoComponent {
  vagaForm: FormGroup = this.fb.group({
    cargo: ['', Validators.required],
    localidade: ['', Validators.required],
    descricao: ['', Validators.required],
    especificacoes: ['', Validators.required], // CSV; será split no submit
    tipoVaga: ['', Validators.required],
    area: ['', Validators.required],
    horario: ['', Validators.required],
    tempoVoluntariado: ['', Validators.required],
    disponibilidade: ['', Validators.required],
  });

  sidebarOpen = true;
  instituicaoNome$ = this.menuService.getInstituicaoNome$();
  saving = false;

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
    private readonly fb: FormBuilder,
    private readonly vagasService: VagasInstituicaoService,
    private readonly router: Router,
    private readonly message: MessageService,
    private readonly geocodingService: GeocodingService,
    private readonly menuService: MenuInstituicaoService,
  ) {}

  ngOnInit(): void {
    this.menuService.loadFromStorage();
  }

  onSubmit(): void {
    if (this.vagaForm.invalid) {
      this.vagaForm.markAllAsTouched();
      this.exibirMensagemErro(this.getMensagemErro());
      return;
    }

    const formValue = this.vagaForm.getRawValue();
    const especificacoes: string[] = String(formValue.especificacoes)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const idInstituicao = Number(localStorage.getItem('instituicaoId'));
    if (!idInstituicao) {
      this.exibirMensagemErro('Instituição não identificada. Faça login novamente.');
      return;
    }

    this.saving = true;

    this.geocodingService.buscarCoordenadas(formValue.localidade).subscribe({
      next: (coords: Coords) => {
        const novaVaga: VagaInstituicao = {
          ...formValue,
          especificacoes,
          instituicao: { id: idInstituicao },
          latitude: coords.latitude,
          longitude: coords.longitude,
          cidade: formValue.localidade,
        };

        this.vagasService.cadastrarVaga(novaVaga).subscribe({
          next: () => {
            this.exibirMensagemSucesso('Vaga publicada com sucesso!');
            this.vagaForm.reset();
          },
          error: (err: Error) => {
            this.exibirMensagemErro(err.message || 'Erro ao publicar a vaga.');
          },
          complete: () => (this.saving = false),
        });
      },
      error: () => {
        this.saving = false;
        this.exibirMensagemErro('Endereço inválido. Verifique o campo Localidade.');
      },
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  vagas(): void {
    this.router.navigate(['/menu-instituicao']);
  }

  isFieldInvalid(field: string): boolean {
    const c = this.vagaForm.get(field);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  private getMensagemErro(): string {
    const controls = this.vagaForm.controls;
    for (const key of Object.keys(controls)) {
      if (controls[key].hasError('required')) {
        return `O campo ${this.getFieldName(key)} é obrigatório.`;
      }
    }
    return 'Por favor, corrija os erros antes de enviar.';
  }

  private getFieldName(field: string): string {
    const map: Record<string, string> = {
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
    return map[field] || field;
  }

  private exibirMensagemSucesso(detail: string): void {
    this.message.add({ severity: 'success', summary: 'Sucesso', detail, styleClass: 'toast-success' });
  }
  private exibirMensagemErro(detail: string): void {
    this.message.add({ severity: 'error', summary: 'Erro', detail, styleClass: 'toast-error' });
  }

  sair(): void {
    this.menuService.logout();
    this.router.navigate(['/login-instituicao']);
  }

  trackByIndex = (i: number) => i;
}
