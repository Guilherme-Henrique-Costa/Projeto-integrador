import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Voluntario {
  id: number;
  nome: string;
  emailInstitucional: string;
  telefone?: string;
  areaInteresse?: string;
  disponibilidade?: string;
}

export interface ServicoVoluntario {
  id: number;
  instituicaoId: number;
  voluntarioId: number;
  nomeVoluntario: string;
  emailVoluntario: string;
  descricao: string;
  criadoEm: string; // ISO
}

export interface RegistrarServicoPayload {
  instituicaoId: number;
  voluntarioId: number;
  descricao: string;
}

@Injectable({ providedIn: 'root' })
export class GestaoInstituicaoService {
  private readonly baseUrl = environment.apiUrl?.replace(/\/+$/, '');

  // endpoints
  private readonly voluntariosDaInstituicaoUrl = (id: number) =>
    `${this.baseUrl}/instituicao/${id}/voluntarios`;
  private readonly registrarServicoUrl = `${this.baseUrl}/gestao/servicos`;
  private readonly servicosPorInstituicaoUrl = (id: number) =>
    `${this.baseUrl}/gestao/servicos/instituicao/${id}`;
  private readonly servicosPorVoluntarioUrl = (id: number) =>
    `${this.baseUrl}/gestao/servicos/voluntario/${id}`;

  constructor(private http: HttpClient) {}

  getVoluntariosDaInstituicao(instituicaoId: number): Observable<Voluntario[]> {
  const url = `${this.baseUrl}/instituicao/${instituicaoId}/voluntarios`;
  return this.http.get<Voluntario[]>(url, { headers: this.authHeaders() }).pipe(
    tap((res) => console.log('[GestaoInstituicaoService] voluntarios recebidos:', res?.length ?? 0)),
    catchError(this.handleError('getVoluntariosDaInstituicao'))
  );
}

  registrarServico(payload: RegistrarServicoPayload): Observable<ServicoVoluntario> {
    console.log('[GestaoInstituicaoService] POST registrar servico', payload);
    return this.http
      .post<ServicoVoluntario>(this.registrarServicoUrl, payload, { headers: this.authHeaders() })
      .pipe(
        tap(res => console.log('[GestaoInstituicaoService] serviço registrado id=', res?.id)),
        catchError(this.handleError('registrarServico'))
      );
  }

  listarServicosPorInstituicao(instituicaoId: number): Observable<ServicoVoluntario[]> {
    console.log('[GestaoInstituicaoService] GET servicos por instituicao', instituicaoId);
    return this.http
      .get<ServicoVoluntario[]>(this.servicosPorInstituicaoUrl(instituicaoId), { headers: this.authHeaders() })
      .pipe(
        tap(res => console.log('[GestaoInstituicaoService] servicos (inst) recebidos:', res?.length ?? 0)),
        catchError(this.handleError('listarServicosPorInstituicao'))
      );
  }

  listarServicosPorVoluntario(voluntarioId: number): Observable<ServicoVoluntario[]> {
    console.log('[GestaoInstituicaoService] GET servicos por voluntario', voluntarioId);
    return this.http
      .get<ServicoVoluntario[]>(this.servicosPorVoluntarioUrl(voluntarioId), { headers: this.authHeaders() })
      .pipe(
        tap(res => console.log('[GestaoInstituicaoService] servicos (vol) recebidos:', res?.length ?? 0)),
        catchError(this.handleError('listarServicosPorVoluntario'))
      );
  }

  // helpers
  private authHeaders(): HttpHeaders | undefined {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
  }

  private handleError(ctx: string) {
    return (error: any) => {
      console.error(`[GestaoInstituicaoService] ${ctx} falhou:`, error);
      const msg =
        error?.error?.message ||
        (error?.status ? `Erro ${error.status} ${error.statusText}` : 'Erro desconhecido.');
      return throwError(() => new Error(msg));
    };
  }
}
