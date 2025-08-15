import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuInstituicaoService {
  /** Estado reativo do nome da instituição */
  private readonly nome$ = new BehaviorSubject<string>('Instituição');

  constructor() {
    this.loadFromStorage();
  }

  /** Carrega o nome salvo após o login */
  loadFromStorage(): void {
    const nome = localStorage.getItem('userName');
    if (nome && nome.trim().length > 0) this.nome$.next(nome);
  }

  /** Define/atualiza o nome (ex.: após edição de perfil) */
  setInstituicaoNome(nome: string): void {
    this.nome$.next(nome);
    localStorage.setItem('userName', nome);
  }

  /** Observável do nome para assinar no componente */
  getInstituicaoNome$() {
    return this.nome$.asObservable();
  }

  /** Logout básico (pode delegar para um AuthService se tiver) */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('instituicaoId');
  }
}
