import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Candidatura {
  id?: number;
  voluntarioId: number;
  vagaId: number;
  nomeVoluntario: string;
  emailVoluntario: string;
  dataCandidatura: Date;
  status: string | null;
}

export interface Vaga {
  id: number;
  cargo: string;
  localidade: string;
  descricao: string;
}

@Injectable({ providedIn: 'root' })
export class CandidatosService {
  private readonly baseUrl = environment.apiUrl?.replace(/\/+$/, '');
  private readonly candidatosUrl = `${this.baseUrl}/candidaturas/vaga`;
  private readonly vagasComCandidatosUrl = `${this.baseUrl}/vagasInstituicao/com-candidatos`;
  private readonly atualizarStatusUrl = `${this.baseUrl}/candidaturas/status`;

  constructor(private http: HttpClient) {}

  /** Lista candidatos de uma vaga específica */
  listarCandidatos(vagaId: number): Observable<Candidatura[]> {
    const url = `${this.candidatosUrl}/${vagaId}`;
    console.log('[CandidatosService] GET', url);

    return this.http
      .get<Candidatura[]>(url, { headers: this.buildAuthHeaders() })
      .pipe(
        tap((res) =>
          console.log(
            '[CandidatosService] candidatos recebidos:',
            res?.length ?? 0
          )
        ),
        map((list) =>
          (list || []).map((c) => ({
            ...c,
            dataCandidatura: (c as any)?.dataCandidatura
              ? new Date((c as any).dataCandidatura)
              : (c as any).dataCandidatura,
            status: (c as any)?.status ?? null,
          }))
        ),
        catchError(this.handleError('listarCandidatos'))
      );
  }

  /** Lista vagas que possuem candidatos (opcionalmente filtradas por instituição) */
  listarVagasComCandidatos(instituicaoId?: number): Observable<Vaga[]> {
    const params = instituicaoId
      ? new HttpParams().set('instituicaoId', String(instituicaoId))
      : undefined;
    console.log(
      '[CandidatosService] GET',
      this.vagasComCandidatosUrl,
      'params:',
      params?.toString()
    );

    return this.http
      .get<Vaga[]>(this.vagasComCandidatosUrl, {
        params,
        headers: this.buildAuthHeaders(),
      })
      .pipe(
        tap((res) =>
          console.log(
            '[CandidatosService] vagas com candidatos:',
            res?.length ?? 0
          )
        ),
        catchError(this.handleError('listarVagasComCandidatos'))
      );
  }

  /** Atualiza o status da candidatura */
  atualizarStatusCandidatura(
    candidaturaId: number,
    status: string
  ): Observable<Candidatura> {
    return this.http
      .patch<Candidatura>(
        `${this.atualizarStatusUrl}/${candidaturaId}`,
        { status },
        { headers: this.buildAuthHeaders() }
      )
      .pipe(catchError(this.handleError('atualizarStatusCandidatura')));
  }

  /** (Opcional) Anexa Authorization se houver token no localStorage */
  private buildAuthHeaders(): HttpHeaders | undefined {
    const token = localStorage.getItem('token');
    return token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;
  }

  private handleError(ctx: string) {
    return (error: any) => {
      const msg =
        error?.error instanceof ErrorEvent
          ? `Erro do cliente: ${error.error.message}`
          : `Erro ${error?.status || ''} ${error?.statusText || ''}`.trim() ||
            'Erro desconhecido.';
      console.error(`[CandidatosService] ${ctx} falhou:`, error);
      return throwError(() => new Error(msg));
    };
  }
}
