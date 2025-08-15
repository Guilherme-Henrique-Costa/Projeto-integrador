import { Injectable } from '@angular/core';

export interface ItemMenu {
  icone: string;
  titulo: string;
  descricao: string;
  rota: string;
}

@Injectable({ providedIn: 'root' })
export class MenuAdminService {

  getNomeAdmin(): string {
    return localStorage.getItem('adminNome') || 'Administrador';
  }

  isLogado(): boolean {
    return !!localStorage.getItem('tokenAdmin');
  }

  sair(): void {
    localStorage.removeItem('tokenAdmin');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminNome');
    localStorage.removeItem('adminPapel');
  }

  getItens(): ItemMenu[] {
    return [
      { icone: '📊', titulo: 'Visão Geral', descricao: 'KPIs e métricas do sistema', rota: '/monitoramento/visao-geral' },
      { icone: '🧑‍🤝‍🧑', titulo: 'Voluntários', descricao: 'Engajamento e presença', rota: '/monitoramento/voluntarios' },
      { icone: '🏫', titulo: 'Instituições', descricao: 'Vagas, respostas e SLA', rota: '/monitoramento/instituicoes' },
      { icone: '🔔', titulo: 'Alertas', descricao: 'Ocorrências e regras de SLA', rota: '/monitoramento/alertas' },
      { icone: '🛡️', titulo: 'Auditoria', descricao: 'Ações sensíveis e logs', rota: '/monitoramento/auditoria' },
      // opcional:
      // { icone: '⚙️', titulo: 'Configurações', descricao: 'Equipe, permissões, preferências', rota: '/admin/configuracoes' },
    ];
  }
}
