import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface SidebarItem {
  label: string;
  icon: string;
  route: string;
}

type StatusInstituicao = 'Ativa' | 'Pendente' | 'Inativa';

export interface Instituicao {
  id: number;
  nome: string;
  email: string;
  cnpj: string;
  cidade: string;
  area: string;
  status: StatusInstituicao;
  vagasAbertas: number;
}

@Component({
  selector: 'app-instituicoes-admin',
  templateUrl: './instituicoes-admin.component.html',
  styleUrls: ['./instituicoes-admin.component.css']
})
export class InstituicoesAdminComponent implements OnInit {

  // Sidebar
  sidebarItems: SidebarItem[] = [
    { label: 'Dashboard',     icon: 'pi pi-chart-bar', route: '/menu-admin' },
    { label: 'Voluntários',   icon: 'pi pi-users',     route: '/voluntarios-admin' },
    { label: 'Instituições',  icon: 'pi pi-building',  route: '/instituicoes-admin' },
    { label: 'Mensagens',     icon: 'pi pi-comments',  route: '/mensagens-admin' },
    { label: 'Relatórios',    icon: 'pi pi-file',      route: '/relatorios-admin' },
    { label: 'Sair',          icon: 'pi pi-sign-out',  route: '/login-admin' },
  ];
  sidebarOpen = true;
  adminNome = localStorage.getItem('adminNome') || 'Administrador';

  // Header
  nomeAdmin = 'Administrador';
  get saudacao(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Bom dia';
    if (h < 18) return 'Boa tarde';
    return 'Boa noite';
  }

  // Filtros / busca
  busca = '';
  areaSelecionada: string | null = null;
  statusSelecionado: StatusInstituicao | null = null;
  cidadeSelecionada: string | null = null;

  areas = [
    { label: 'Todas as áreas', value: null },
    { label: 'Educação', value: 'Educação' },
    { label: 'Saúde', value: 'Saúde' },
    { label: 'Meio Ambiente', value: 'Meio Ambiente' },
    { label: 'Cultura', value: 'Cultura' },
    { label: 'Assistência Social', value: 'Assistência Social' },
  ];

  statusOptions = [
    { label: 'Todos', value: null },
    { label: 'Ativa', value: 'Ativa' },
    { label: 'Pendente', value: 'Pendente' },
    { label: 'Inativa', value: 'Inativa' },
  ];

  cidades = [
    { label: 'Todas', value: null },
    { label: 'Brasília', value: 'Brasília' },
    { label: 'Taguatinga', value: 'Taguatinga' },
    { label: 'Águas Claras', value: 'Águas Claras' },
    { label: 'Ceilândia', value: 'Ceilândia' },
  ];

  // Dados (mock)
  todas: Instituicao[] = [
    { id: 1, nome: 'Instituto Alfa',  email: 'contato@alfa.org',  cnpj: '00.000.000/0001-11', cidade: 'Brasília',    area: 'Educação',           status: 'Ativa',    vagasAbertas: 4 },
    { id: 2, nome: 'Casa Beta',       email: 'contato@beta.org',  cnpj: '11.111.111/0001-22', cidade: 'Taguatinga',  area: 'Saúde',              status: 'Pendente', vagasAbertas: 2 },
    { id: 3, nome: 'ONG Gama',        email: 'contato@gama.org',  cnpj: '22.222.222/0001-33', cidade: 'Brasília',    area: 'Meio Ambiente',      status: 'Ativa',    vagasAbertas: 5 },
    { id: 4, nome: 'Associação Delta',email: 'contato@delta.org', cnpj: '33.333.333/0001-44', cidade: 'Águas Claras',area: 'Cultura',            status: 'Inativa',  vagasAbertas: 0 },
    { id: 5, nome: 'Projeto Épsilon', email: 'contato@eps.org',   cnpj: '44.444.444/0001-55', cidade: 'Ceilândia',   area: 'Assistência Social', status: 'Ativa',    vagasAbertas: 3 },
  ];

  // View
  filtradas: Instituicao[] = [];
  pagina: Instituicao[] = [];

  // Paginação
  page = 0;
  rows = 6;

  // Gráfico
  statusChartData: any;
  statusChartOptions: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const n = localStorage.getItem('adminNome');
    if (n) this.nomeAdmin = n;
    this.aplicarFiltros();
  }

  // trackBy usado no *ngFor do template
  trackByIndex(index: number, _item: SidebarItem): number {
    return index;
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  sair(): void {
    localStorage.removeItem('tokenAdmin');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminNome');
    localStorage.removeItem('adminPapel');
    this.router.navigate(['/login-admin']);
  }

  // =============== Filtros/Pesquisa ===============
  aplicarFiltros(): void {
    const texto = (this.busca || '').toLowerCase().trim();

    this.filtradas = this.todas.filter((i) => {
      const atendeBusca =
        !texto ||
        i.nome.toLowerCase().includes(texto) ||
        i.email.toLowerCase().includes(texto) ||
        i.cnpj.toLowerCase().includes(texto) ||
        i.cidade.toLowerCase().includes(texto) ||
        i.area.toLowerCase().includes(texto);

      const atendeArea   = !this.areaSelecionada   || i.area   === this.areaSelecionada;
      const atendeStatus = !this.statusSelecionado || i.status === this.statusSelecionado;
      const atendeCidade = !this.cidadeSelecionada || i.cidade === this.cidadeSelecionada;

      return atendeBusca && atendeArea && atendeStatus && atendeCidade;
    });

    this.page = 0;
    this.refreshPagina();
    this.montarChart();
  }

  onPageChange(e: { page: number; rows: number }): void {
    this.page = e.page;
    this.rows = e.rows;
    this.refreshPagina();
  }

  refreshPagina(): void {
    const start = this.page * this.rows;
    this.pagina = this.filtradas.slice(start, start + this.rows);
  }

  // =============== KPIs ===============
  get total(): number { return this.filtradas.length; }
  get totalAtivas(): number { return this.countByStatus('Ativa'); }
  get totalPendentes(): number { return this.countByStatus('Pendente'); }
  get totalInativas(): number { return this.countByStatus('Inativa'); }

  private countByStatus(st: StatusInstituicao): number {
    return this.filtradas.reduce((acc, i) => acc + (i.status === st ? 1 : 0), 0);
  }

  // =============== Gráfico ===============
  private montarChart(): void {
    this.statusChartData = {
      labels: ['Ativas', 'Pendentes', 'Inativas'],
      datasets: [{ data: [this.totalAtivas, this.totalPendentes, this.totalInativas] }]
    };
    this.statusChartOptions = {
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#374151' } } }
    };
  }

  // =============== UI helpers ===============
  getSeverity(status: StatusInstituicao): 'success' | 'warning' | 'danger' {
    if (status === 'Ativa') return 'success';
    if (status === 'Pendente') return 'warning';
    return 'danger';
  }
}
