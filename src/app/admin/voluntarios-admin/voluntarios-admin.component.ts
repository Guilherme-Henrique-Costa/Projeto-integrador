import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

interface Voluntario {
  id: number;
  nome: string;
  email: string;
  area: string;
  status: 'Ativo' | 'Pendente' | 'Inativo';
  cidade: string;
  inscricoes: number;
  horas: number;
  criadoEm: string; // ISO
}

interface SidebarItem { label: string; icon: string; route: string; }

@Component({
  selector: 'app-voluntarios-admin',
  templateUrl: './voluntarios-admin.component.html',
  styleUrls: ['./voluntarios-admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoluntariosAdminComponent {
  sidebarOpen = true;
  adminNome = localStorage.getItem('adminNome') || 'Administrador';

  sidebarItems: SidebarItem[] = [
    { label: 'Dashboard',     icon: 'pi pi-chart-bar', route: '/menu-admin' },
    { label: 'Voluntários',   icon: 'pi pi-users',     route: '/voluntarios-admin' },
    { label: 'Instituições',  icon: 'pi pi-building',  route: '/instituicoes-admin' },
    { label: 'Mensagens',     icon: 'pi pi-comments',  route: '/mensagens-admin' },
    { label: 'Relatórios',    icon: 'pi pi-file',      route: '/relatorios-admin' },
    { label: 'Sair',          icon: 'pi pi-sign-out',  route: '/login-admin' },
  ];

  toggleSidebar(): void { this.sidebarOpen = !this.sidebarOpen; }
  sair(): void {
    localStorage.removeItem('tokenAdmin');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminNome');
    localStorage.removeItem('adminPapel');
    this.router.navigate(['/login-admin']);
  }
  trackByIndex = (i: number) => i;

  // ---------- Dados (mock) ----------
  areas = ['Educação', 'Saúde', 'Meio Ambiente', 'Cultura', 'Direitos', 'Outros'];
  statusOptions: Array<Voluntario['status']> = ['Ativo', 'Pendente', 'Inativo'];

  voluntarios: Voluntario[] = [
    { id: 1, nome: 'Ana Souza', email: 'ana@ex.com', area: 'Educação', status: 'Ativo', cidade: 'Brasília', inscricoes: 6, horas: 42, criadoEm: '2024-01-15' },
    { id: 2, nome: 'Carlos Lima', email: 'carlos@ex.com', area: 'Meio Ambiente', status: 'Pendente', cidade: 'Águas Claras', inscricoes: 2, horas: 8, criadoEm: '2024-04-02' },
    { id: 3, nome: 'Fernanda Rocha', email: 'fernanda@ex.com', area: 'Saúde', status: 'Ativo', cidade: 'Taguatinga', inscricoes: 4, horas: 27, criadoEm: '2024-02-20' },
    { id: 4, nome: 'João Pedro', email: 'joao@ex.com', area: 'Cultura', status: 'Inativo', cidade: 'Brasília', inscricoes: 1, horas: 0, criadoEm: '2023-11-12' },
    { id: 5, nome: 'Marina Alves', email: 'marina@ex.com', area: 'Direitos', status: 'Ativo', cidade: 'Gama', inscricoes: 3, horas: 18, criadoEm: '2024-05-03' },
    { id: 6, nome: 'Rafael Mota', email: 'rafael@ex.com', area: 'Educação', status: 'Ativo', cidade: 'Sobradinho', inscricoes: 7, horas: 55, criadoEm: '2024-03-28' },
    { id: 7, nome: 'Bianca Dias', email: 'bianca@ex.com', area: 'Meio Ambiente', status: 'Pendente', cidade: 'Brasília', inscricoes: 1, horas: 3, criadoEm: '2024-06-01' },
    { id: 8, nome: 'Lucas Andrade', email: 'lucas@ex.com', area: 'Outros', status: 'Ativo', cidade: 'Guará', inscricoes: 5, horas: 25, criadoEm: '2024-02-03' },
    { id: 9, nome: 'Paula Reis', email: 'paula@ex.com', area: 'Saúde', status: 'Ativo', cidade: 'Cruzeiro', inscricoes: 2, horas: 10, criadoEm: '2024-01-30' },
    { id: 10, nome: 'Eduardo T.', email: 'edu@ex.com', area: 'Educação', status: 'Inativo', cidade: 'Asa Norte', inscricoes: 0, horas: 0, criadoEm: '2023-10-08' },
  ];

  // ---------- Filtros ----------
  busca = '';
  filtroArea: string | null = null;
  filtroStatus: Voluntario['status'] | null = null;
  filtroCidade: string | null = null;

  // paginação simples (p-table também pode paginar, aqui controlamos a fatia visível)
  page = 0;
  rows = 6;

  get cidades(): string[] {
    return Array.from(new Set(this.voluntarios.map(v => v.cidade))).sort();
  }

  get filtrados(): Voluntario[] {
    const texto = this.busca.trim().toLowerCase();
    return this.voluntarios.filter(v => {
      const matchTexto =
        !texto ||
        v.nome.toLowerCase().includes(texto) ||
        v.email.toLowerCase().includes(texto) ||
        v.area.toLowerCase().includes(texto) ||
        v.cidade.toLowerCase().includes(texto);
      const matchArea = !this.filtroArea || v.area === this.filtroArea;
      const matchStatus = !this.filtroStatus || v.status === this.filtroStatus;
      const matchCidade = !this.filtroCidade || v.cidade === this.filtroCidade;
      return matchTexto && matchArea && matchStatus && matchCidade;
    });
  }

  get pagina(): Voluntario[] {
    const start = this.page * this.rows;
    return this.filtrados.slice(start, start + this.rows);
  }

  onPageChange(e: { page: number; rows: number }) {
    this.page = e.page;
    this.rows = e.rows;
  }

  // ---------- Resumo e gráficos ----------
  get totalAtivos()   { return this.voluntarios.filter(v => v.status === 'Ativo').length; }
  get totalPend()     { return this.voluntarios.filter(v => v.status === 'Pendente').length; }
  get totalInativos() { return this.voluntarios.filter(v => v.status === 'Inativo').length; }
  get mediaHoras() {
    const soma = this.voluntarios.reduce((acc, v) => acc + v.horas, 0);
    return Math.round((soma / this.voluntarios.length) || 0);
  }

  get pieData() {
    return {
      labels: ['Ativos', 'Pendentes', 'Inativos'],
      datasets: [
        {
          data: [this.totalAtivos, this.totalPend, this.totalInativos],
          backgroundColor: ['#22c55e', '#fde047', '#ef4444'],
          hoverBackgroundColor: ['#4ade80', '#fde68a', '#f87171'],
        },
      ],
    };
  }

  get pieOptions() {
    return { plugins: { legend: { labels: { color: '#333' } } } };
  }

  get barData() {
    const porArea = this.areas.map(a => this.voluntarios.filter(v => v.area === a).reduce((acc, v) => acc + v.horas, 0));
    return {
      labels: this.areas,
      datasets: [
        {
          label: 'Horas voluntárias por área',
          data: porArea,
          backgroundColor: '#662c92',
        },
      ],
    };
  }

  get barOptions() {
    return {
      plugins: { legend: { labels: { color: '#333' } } },
      scales: {
        x: { ticks: { color: '#555' }, grid: { color: '#eee' } },
        y: { ticks: { color: '#555' }, grid: { color: '#eee' } },
      },
    };
  }

  constructor(private router: Router) {}
}
