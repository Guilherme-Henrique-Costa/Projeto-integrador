import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface AdminProfile {
  id: number;
  nome: string;
  email: string;
  papel: string;
}

export interface ItemMenu {
  icone: string;
  titulo: string;
  descricao: string;
  rota: string;
  badge?: number;
  disabled?: boolean;
}

export interface ResumoDashboard {
  voluntariosAtivos: number;
  instituicoesAtivas: number;
  novasCandidaturasMes: number;
  vagasAbertas: number;
}

export interface SeriesMensais {
  meses: string[];
  voluntarios: number[];
  instituicoes: number[];
}

@Injectable({ providedIn: 'root' })
export class MenuAdminService {
  private baseUrl = environment.apiUrl ?? '';
  private reload$ = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {}

  // ========= Autenticação / Sessão =========
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

  /** Força recarregar perfil, menu e dados do dashboard */
  refresh(): void {
    this.reload$.next();
  }

  // ========= Perfil (nome do admin) =========
  private profile$: Observable<AdminProfile | null> = this.reload$.pipe(
    switchMap(() =>
      this.http.get<AdminProfile>(`${this.baseUrl}/api/v1/admin/perfil`).pipe(
        catchError(() => of(null))
      )
    ),
    shareReplay(1)
  );

  /** Nome do admin vindo do backend (fallback para 'Administrador') */
  getNomeAdmin$(): Observable<string> {
    return this.profile$.pipe(map(p => p?.nome ?? 'Administrador'));
  }

  // ========= Menu dinâmico =========
  private itensMenu$: Observable<ItemMenu[]> = this.reload$.pipe(
    switchMap(() =>
      this.http.get<ItemMenu[]>(`${this.baseUrl}/api/v1/admin/menu`).pipe(
        catchError(() => of<ItemMenu[]>([]))
      )
    ),
    shareReplay(1)
  );

  getItens$(): Observable<ItemMenu[]> {
    return this.itensMenu$;
  }

  // ========= Dashboard (resumo + séries) =========
  private resumoDashboard$: Observable<ResumoDashboard> = this.reload$.pipe(
    switchMap(() =>
      this.http.get<ResumoDashboard>(`${this.baseUrl}/api/v1/admin/dashboard/resumo`).pipe(
        catchError(() =>
          of<ResumoDashboard>({
            voluntariosAtivos: 0,
            instituicoesAtivas: 0,
            novasCandidaturasMes: 0,
            vagasAbertas: 0
          })
        )
      )
    ),
    shareReplay(1)
  );

  getResumo$(): Observable<ResumoDashboard> {
    return this.resumoDashboard$;
  }

  getSeries$(meses = 6): Observable<SeriesMensais> {
    const params = new HttpParams().set('meses', meses);
    return this.http
      .get<SeriesMensais>(`${this.baseUrl}/api/v1/admin/dashboard/series`, { params })
      .pipe(
        catchError(() =>
          of<SeriesMensais>({ meses: [], voluntarios: [], instituicoes: [] })
        )
      );
  }
}
