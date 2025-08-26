import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface SidebarItem {
  label: string;
  icon: string;
  route: string;
}

interface RegistroRelatorio {
  nome: string;
  email?: string;
  tipo: 'Voluntário' | 'Instituição' | 'Vaga';
  area: string;
  status: 'Ativo' | 'Pendente' | 'Inativo';
  cidade: string;
  horas?: number;
  criadoEm: Date;
}

@Component({
  selector: 'app-relatorios-admin',
  templateUrl: './relatorios-admin.component.html',
  styleUrls: ['./relatorios-admin.component.css']
})
export class RelatoriosAdminComponent {
  // Sidebar/topbar
  adminNome = localStorage.getItem('adminNome') || 'Administrador';
  sidebarOpen = true;
  sidebarItems: SidebarItem[] = [
    { label: 'Dashboard',   icon: 'pi pi-chart-bar',  route: '/menu-admin' },
    { label: 'Voluntários', icon: 'pi pi-users',      route: '/voluntarios-admin' },
    { label: 'Instituições',icon: 'pi pi-building',   route: '/instituicoes-admin' },
    { label: 'Mensagens',     icon: 'pi pi-comments',  route: '/mensagens-admin' },
    { label: 'Relatórios',  icon: 'pi pi-file',       route: '/relatorios-admin' },
    { label: 'Sair',        icon: 'pi pi-sign-out',   route: '/admin/login' },
  ];
  trackByIndex = (_: number, __: unknown) => _;
  toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; }

   sair(): void {
    localStorage.removeItem('tokenAdmin');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminNome');
    localStorage.removeItem('adminPapel');
    this.router.navigate(['/login-admin']);
  }

  // Filtros
  busca = '';
  tiposRelatorio = ['Voluntário', 'Instituição', 'Vaga'].map(v => ({ label: v, value: v }));
  tipoSelecionado?: 'Voluntário' | 'Instituição' | 'Vaga';
  periodo: Date[] | null = null;

  areas = ['Saúde','Educação','Ambiental','Cultura','Assistência'].map(v => ({ label: v, value: v }));
  statusOptions = ['Ativo','Pendente','Inativo'].map(v => ({ label: v, value: v }));
  cidades = ['Brasília','Taguatinga','Ceilândia','Gama','Sobradinho'].map(v => ({ label: v, value: v }));

  filtroArea?: string;
  filtroStatus?: 'Ativo'|'Pendente'|'Inativo';
  filtroCidade?: string;

  // Dados (mock) – troque por seus dados reais
  registros: RegistroRelatorio[] = [
    { nome: 'Ana Souza', email: 'ana@ceub.br', tipo: 'Voluntário', area: 'Saúde', status: 'Ativo', cidade: 'Brasília', horas: 12, criadoEm: new Date(2025, 2, 12) },
    { nome: 'ONG Vida', tipo: 'Instituição', area: 'Educação', status: 'Pendente', cidade: 'Taguatinga', criadoEm: new Date(2025, 3, 3) },
    { nome: 'João Lima', email: 'joao@ceub.br', tipo: 'Voluntário', area: 'Cultura', status: 'Inativo', cidade: 'Ceilândia', horas: 4, criadoEm: new Date(2025, 4, 28) },
    { nome: 'Vaga - Feira Solidária', tipo: 'Vaga', area: 'Assistência', status: 'Ativo', cidade: 'Brasília', criadoEm: new Date(2025, 5, 10) },
    { nome: 'Instituto Verde', tipo: 'Instituição', area: 'Ambiental', status: 'Ativo', cidade: 'Sobradinho', criadoEm: new Date(2025, 6, 2) },
  ];

  filtrados: RegistroRelatorio[] = [];
  pagina: RegistroRelatorio[] = [];
  rows = 10;
  page = 0;

  // KPIs
  kpiTotal = 0;
  kpiAtivos = 0;
  kpiPendentes = 0;
  kpiInativos = 0;

  // Charts
  pieData: any;
  pieOptions: any;
  lineData: any;
  lineOptions: any;

  constructor(private router: Router) {
    this.aplicarFiltros();
    this.configurarCharts();
  }

  private configurarCharts() {
    const ativos = this.registros.filter(r => r.status === 'Ativo').length;
    const pend = this.registros.filter(r => r.status === 'Pendente').length;
    const inat = this.registros.filter(r => r.status === 'Inativo').length;

    this.pieData = {
      labels: ['Ativo', 'Pendente', 'Inativo'],
      datasets: [{
        data: [ativos, pend, inat],
      }]
    };
    this.pieOptions = {
      plugins: { legend: { labels: { color: '#333' } } },
      maintainAspectRatio: false
    };

    // série mensal (exemplo com os últimos 6 meses)
    const meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    const contagemPorMes = new Array(12).fill(0);
    this.registros.forEach(r => contagemPorMes[r.criadoEm.getMonth()]++);

    this.lineData = {
      labels: meses,
      datasets: [{
        label: 'Registros',
        data: contagemPorMes,
        fill: false,
        tension: 0.3
      }]
    };
    this.lineOptions = {
      plugins: { legend: { labels: { color: '#333' } } },
      scales: {
        x: { ticks: { color: '#333' }, grid: { color: '#eee' } },
        y: { ticks: { color: '#333' }, grid: { color: '#eee' } }
      },
      maintainAspectRatio: false
    };
  }

  aplicarFiltros() {
    const [ini, fim] = this.periodo ?? [null, null];

    this.filtrados = this.registros.filter(r => {
      const byBusca =
        !this.busca ||
        [r.nome, r.email, r.area, r.cidade, r.tipo].some(v =>
          (v ?? '').toString().toLowerCase().includes(this.busca.toLowerCase())
        );

      const byTipo = !this.tipoSelecionado || r.tipo === this.tipoSelecionado;
      const byArea = !this.filtroArea || r.area === this.filtroArea;
      const byStatus = !this.filtroStatus || r.status === this.filtroStatus;
      const byCidade = !this.filtroCidade || r.cidade === this.filtroCidade;

      const byPeriodo =
        !ini || !fim
          ? true
          : r.criadoEm >= this.zeroHoras(ini) && r.criadoEm <= this.fimDoDia(fim);

      return byBusca && byTipo && byArea && byStatus && byCidade && byPeriodo;
    });

    this.kpiTotal = this.filtrados.length;
    this.kpiAtivos = this.filtrados.filter(r => r.status === 'Ativo').length;
    this.kpiPendentes = this.filtrados.filter(r => r.status === 'Pendente').length;
    this.kpiInativos = this.filtrados.filter(r => r.status === 'Inativo').length;

    this.page = 0;
    this.atualizarPagina();
  }

  onPageChange(e: any) {
    this.page = Math.floor(e.first / e.rows);
    this.rows = e.rows;
    this.atualizarPagina();
  }

  private atualizarPagina() {
    const start = this.page * this.rows;
    const end = start + this.rows;
    this.pagina = this.filtrados.slice(start, end);
  }

  gerarRelatorio() {
    // se você quiser disparar busca no backend, faça aqui
    this.aplicarFiltros();
    this.configurarCharts();
  }

  exportCSV() {
    const header = ['Nome','Tipo','Área','Status','Cidade','Horas','CriadoEm'];
    const linhas = this.filtrados.map(r => [
      r.nome, r.tipo, r.area, r.status, r.cidade, r.horas ?? '', this.formatarData(r.criadoEm)
    ]);

    const csv = [header, ...linhas].map(l => l.map(this.csvEscape).join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `relatorio_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  imprimirPDF() {
    // simples: usa o print do navegador; para PDF avançado, integrar jsPDF depois
    window.print();
  }

  private csvEscape(v: any): string {
    const s = (v ?? '').toString();
    return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    // separador ; para compatibilidade com Excel pt-BR
  }

  private zeroHoras(d: Date)  { return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0,0,0); }
  private fimDoDia(d: Date)   { return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23,59,59); }
  private formatarData(d: Date) {
    const dd = String(d.getDate()).padStart(2,'0');
    const mm = String(d.getMonth()+1).padStart(2,'0');
    const a = d.getFullYear();
    return `${dd}/${mm}/${a}`;
  }
}
