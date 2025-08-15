import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Candidatura {
  voluntarioId: number;
  vagaId: number;
  nomeVoluntario: string;
  emailVoluntario: string;
  dataCandidatura: string | Date; // backend pode enviar string ISO; o componente trata
  status: string;
}

export interface Vaga {
  id: number;
  cargo: string;
  localidade: string;
  descricao: string;
}

@Injectable({ providedIn: 'root' })
export class CandidatosService {
  private readonly candidatosUrl = `${environment.apiUrl}/candidaturas/vaga`;
  private readonly vagasComCandidatosUrl = `${environment.apiUrl}/vagasInstituicao/com-candidatos`;

  constructor(private http: HttpClient) {}

  /** Lista candidatos de uma vaga específica */
  listarCandidatos(vagaId: number): Observable<Candidatura[]> {
    return this.http
      .get<Candidatura[]>(`${this.candidatosUrl}/${vagaId}`)
      .pipe(catchError(this.handleError));
  }

  /** Lista vagas que possuem candidatos */
  listarVagasComCandidatos(instituicaoId?: number): Observable<Vaga[]> {
    const params = instituicaoId ? new HttpParams().set('instituicaoId', String(instituicaoId)) : undefined;
    return this.http
      .get<Vaga[]>(this.vagasComCandidatosUrl, { params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    const msg =
      error?.error instanceof ErrorEvent
        ? `Erro do cliente: ${error.error.message}`
        : `Erro ${error?.status || ''} ${error?.statusText || ''}`.trim() || 'Erro desconhecido.';
    return throwError(() => new Error(msg));
  }
}
