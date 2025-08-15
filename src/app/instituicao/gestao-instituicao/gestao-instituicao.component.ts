import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuInstituicaoService } from '../menu-instituicao/menu-instituicao.service';

interface Voluntario {
  nome: string;
  email: string;
  telefone: string;
  areaInteresse: string;
  disponibilidade: string;
}

@Component({
  selector: 'app-gestao-instituicao',
  templateUrl: './gestao-instituicao.component.html',
  styleUrls: ['./gestao-instituicao.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestaoInstituicaoComponent {
  // estado UI
  sidebarOpen = true;
  searchQuery = '';
  descricaoServico = '';
  voluntarioSelecionado: Voluntario | null = null;

  // nome (reativo) vindo do serviço central
  instituicaoNome$ = this.menuService.getInstituicaoNome$();

  sidebarItems = [
    { label: 'Menu', icon: 'pi pi-compass', route: '/menu-instituicao' },
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil-instituicao' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas-instituicao' },
    { label: 'Candidatos', icon: 'pi pi-user', route: '/candidatos' },
    { label: 'Feedback', icon: 'pi pi-inbox', route: '/feedback-instituicao' },
    { label: 'Gestão', icon: 'pi pi-chart-line', route: '/gestao' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagem-instituicao' },
    { label: 'Ranking', icon: 'pi pi-star-fill', route: '/ranking-instituicao' },
    { label: 'Sair', icon: 'pi pi-sign-out', route: '/login-instituicao' },
  ];

  // mock de voluntários (trocar por API quando desejar)
  voluntarios: Voluntario[] = [
    { nome: 'Ana Souza',      email: 'ana@email.com',      telefone: '61 99999-1111', areaInteresse: 'Educação',       disponibilidade: 'Manhãs' },
    { nome: 'Carlos Lima',    email: 'carlos@email.com',   telefone: '61 88888-2222', areaInteresse: 'Meio Ambiente',  disponibilidade: 'Tardes' },
    { nome: 'Fernanda Rocha', email: 'fernanda@email.com', telefone: '61 77777-3333', areaInteresse: 'Saúde',          disponibilidade: 'Finais de Semana' },
  ];

  constructor(
    private readonly menuService: MenuInstituicaoService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    // garante nome na sidebar
    this.menuService.loadFromStorage();
  }

  // lista filtrada pela busca
  get voluntariosFiltrados(): Voluntario[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.voluntarios;
    return this.voluntarios.filter(v =>
      v.nome.toLowerCase().includes(q) ||
      v.email.toLowerCase().includes(q) ||
      v.areaInteresse.toLowerCase().includes(q)
    );
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  selecionarVoluntario(voluntario: Voluntario): void {
    this.voluntarioSelecionado = voluntario;
    this.descricaoServico = '';
  }

  registrarServico(): void {
    if (!this.voluntarioSelecionado || !this.descricaoServico.trim()) return;

    // aqui você pode chamar um service HTTP para persistir no backend
    console.log('[Gestão] Registrar serviço:', {
      voluntario: this.voluntarioSelecionado,
      descricao: this.descricaoServico.trim(),
      data: new Date().toISOString(),
    });

    // feedback simples e reset
    alert('Serviço registrado com sucesso!');
    this.descricaoServico = '';
  }

  sair(): void {
    this.menuService.logout();
    this.router.navigate(['/login-instituicao']);
  }

  trackByIndex = (i: number) => i;
}
