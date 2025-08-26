import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface SidebarItem { label: string; icon: string; route: string; }

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuAdminComponent implements OnInit {
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

  pieData: any;
  pieOptions: any;

  lineData: any;
  lineOptions: any;

  resumo = {
    voluntariosAtivos: 564,
    instituicoesAtivas: 57,
    novasCandidaturasMes: 156,
    vagasAbertas: 42
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.configurarGraficos();
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

  trackByIndex = (i: number) => i;

  private configurarGraficos(): void {
    // Pizza: distribuição total
    this.pieData = {
      labels: ['Voluntários', 'Instituições'],
      datasets: [
        {
          data: [this.resumo.voluntariosAtivos, this.resumo.instituicoesAtivas],
          backgroundColor: ['#ec0089', '#662c92'],
          hoverBackgroundColor: ['#ff279f', '#7b45a6']
        }
      ]
    };

    // Linha: evolução mensal (mock)
    this.lineData = {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [
        {
          label: 'Voluntários',
          data: [820, 900, 980, 1100, 1180, this.resumo.voluntariosAtivos],
          fill: false,
          tension: 0.3,
          borderColor: '#ec0089'
        },
        {
          label: 'Instituições',
          data: [54, 60, 65, 70, 78, this.resumo.instituicoesAtivas],
          fill: false,
          tension: 0.3,
          borderColor: '#662c92'
        }
      ]
    };

    // opções simples (tema claro dentro do card branco)
    this.pieOptions = {
      plugins: { legend: { labels: { color: '#333' } } }
    };
    this.lineOptions = {
      plugins: { legend: { labels: { color: '#333' } } },
      scales: {
        x: { ticks: { color: '#555' }, grid: { color: '#eee' } },
        y: { ticks: { color: '#555' }, grid: { color: '#eee' } }
      }
    };
  }
}
