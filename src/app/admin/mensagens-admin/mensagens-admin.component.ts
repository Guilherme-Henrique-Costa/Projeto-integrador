import { Component, ElementRef, QueryList, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

interface SidebarItem {
  label: string;
  icon: string;
  route: string;
}

type TipoConversa = 'Voluntário' | 'Instituição';
type Autor = 'Voluntario' | 'Instituicao' | 'Admin';

interface Mensagem {
  id: number;
  autor: Autor;
  conteudo: string;
  data: Date;
  lida: boolean;
}

interface Conversa {
  id: number;
  titulo: string;
  tipo: TipoConversa;
  naoLidas: number;
  ultimo: Mensagem | null;
  mensagens: Mensagem[];
}

@Component({
  selector: 'app-mensagens-admin',
  templateUrl: './mensagens-admin.component.html',
  styleUrls: ['./mensagens-admin.component.css']
})
export class MensagensAdminComponent {
  constructor(private router: Router) {}

  // ---- Sidebar/Topbar ----
  adminNome = localStorage.getItem('adminNome') || 'Administrador';
  sidebarOpen = true;
  sidebarItems: SidebarItem[] = [
    { label: 'Dashboard',    icon: 'pi pi-chart-bar', route: '/menu-admin' },
    { label: 'Voluntários',  icon: 'pi pi-users',     route: '/voluntarios-admin' },
    { label: 'Instituições', icon: 'pi pi-building',  route: '/instituicoes-admin' },
    { label: 'Mensagens',    icon: 'pi pi-comments',  route: '/mensagens-admin' },
    { label: 'Relatórios',   icon: 'pi pi-file',      route: '/relatorios-admin' },
    { label: 'Sair',         icon: 'pi pi-sign-out',  route: '/admin/login' },
  ];
  trackByIndex = (i: number) => i;
  toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; }
  sair(): void {
    localStorage.removeItem('tokenAdmin');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminNome');
    localStorage.removeItem('adminPapel');
    this.router.navigate(['/login-admin']);
  }

  // ---- Lista/Filtros ----
  busca = '';
  tipos = [{label:'Voluntário', value:'Voluntário'}, {label:'Instituição', value:'Instituição'}];
  filtroTipo?: TipoConversa;
  ordenacoes = [{label:'Mais recentes', value:'recentes'}, {label:'Não lidas', value:'naoLidas'}];
  ordenarPor: 'recentes'|'naoLidas' = 'recentes';
  somenteNaoLidas = false;

  conversas: Conversa[] = [
    {
      id: 1, titulo: 'Ana Souza', tipo: 'Voluntário', naoLidas: 2,
      mensagens: [
        { id: 1, autor:'Voluntario', conteudo: 'Oi, tudo bem?', data: new Date(Date.now()-1000*60*60), lida:false },
        { id: 2, autor:'Instituicao', conteudo: 'Olá, Ana! Tudo sim. Como posso ajudar?', data: new Date(Date.now()-1000*60*45), lida:true },
        { id: 3, autor:'Voluntario', conteudo: 'Queria confirmar o horário de amanhã.', data: new Date(Date.now()-1000*60*5), lida:false },
      ],
      ultimo: null
    },
    {
      id: 2, titulo: 'ONG Vida', tipo: 'Instituição', naoLidas: 0,
      mensagens: [
        { id: 1, autor:'Instituicao', conteudo: 'Recebemos o relatório, obrigado!', data: new Date(Date.now()-1000*60*120), lida:true },
        { id: 2, autor:'Admin', conteudo: 'Perfeito. Qualquer ajuste nos avise.', data: new Date(Date.now()-1000*60*80), lida:true },
      ],
      ultimo: null
    },
    {
      id: 3, titulo: 'João Lima', tipo: 'Voluntário', naoLidas: 1,
      mensagens: [
        { id: 1, autor:'Voluntario', conteudo: 'Meu certificado não apareceu.', data: new Date(Date.now()-1000*60*30), lida:false },
      ],
      ultimo: null
    },
  ];

  conversasFiltradas: Conversa[] = [];
  conversaSelecionada?: Conversa;

  // Chat
  novaMensagem = '';

  @ViewChild('chatBody') chatBody?: ElementRef<HTMLDivElement>;

  ngOnInit() {
    // define 'ultimo' e aplica filtros
    this.conversas.forEach(c => c.ultimo = c.mensagens.slice(-1)[0] ?? null);
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    const q = this.busca.trim().toLowerCase();

    let base = this.conversas.filter(c => {
      const byTexto = !q || c.titulo.toLowerCase().includes(q) || (c.ultimo?.conteudo.toLowerCase().includes(q) ?? false);
      const byTipo = !this.filtroTipo || c.tipo === this.filtroTipo;
      const byNaoLidas = !this.somenteNaoLidas || c.naoLidas > 0;
      return byTexto && byTipo && byNaoLidas;
    });

    if (this.ordenarPor === 'recentes') {
      base = base.sort((a, b) => (b.ultimo?.data?.getTime() ?? 0) - (a.ultimo?.data?.getTime() ?? 0));
    } else {
      base = base.sort((a, b) => (b.naoLidas - a.naoLidas) || ((b.ultimo?.data?.getTime() ?? 0) - (a.ultimo?.data?.getTime() ?? 0)));
    }

    this.conversasFiltradas = [...base];

    // mantém seleção se possível
    if (this.conversaSelecionada) {
      const keep = this.conversasFiltradas.find(c => c.id === this.conversaSelecionada!.id);
      this.conversaSelecionada = keep || this.conversasFiltradas[0];
    } else {
      this.conversaSelecionada = this.conversasFiltradas[0];
    }
  }

  abrirConversa(c: Conversa) {
    this.conversaSelecionada = c;
    this.marcarComoLida(c, /*silencioso*/ true);
    setTimeout(() => this.scrollBottom(), 0);
  }

  atualizarConversas() {
    // placeholder para buscar no backend
    this.aplicarFiltros();
    setTimeout(() => this.scrollBottom(), 0);
  }

  marcarComoLida(c: Conversa, silencioso = false) {
    const antes = c.naoLidas;
    c.mensagens.forEach(m => m.lida = true);
    c.naoLidas = 0;
    c.ultimo = c.mensagens.slice(-1)[0] ?? null;
    if (!silencioso && antes > 0) this.aplicarFiltros();
  }

  enviarMensagem() {
    const texto = (this.novaMensagem ?? '').trim();
    if (!texto || !this.conversaSelecionada) return;

    const c = this.conversaSelecionada;
    const novo: Mensagem = {
      id: (c.mensagens.slice(-1)[0]?.id ?? 0) + 1,
      autor: 'Admin',
      conteudo: texto,
      data: new Date(),
      lida: true
    };
    c.mensagens.push(novo);
    c.ultimo = novo;

    // mock: simula recebimento da outra ponta após alguns segundos
    setTimeout(() => {
      const resposta: Mensagem = {
        id: novo.id + 1,
        autor: c.tipo === 'Voluntário' ? 'Voluntario' : 'Instituicao',
        conteudo: 'Obrigado pelo retorno!',
        data: new Date(),
        lida: false
      };
      c.mensagens.push(resposta);
      c.ultimo = resposta;
      c.naoLidas += 1;
      this.aplicarFiltros();
      this.scrollBottom();
    }, 2000);

    this.novaMensagem = '';
    this.scrollBottom();
  }

  private scrollBottom() {
    const el = this.chatBody?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }

  // trackBys
  trackById = (_: number, c: Conversa) => c.id;
  trackByMsg = (_: number, m: Mensagem) => m.id;
}
