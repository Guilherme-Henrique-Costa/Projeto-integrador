import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface VagaInstituicao {
  id?: number;
  cargo: string;
  localidade: string;
  descricao: string;
  especificacoes: string[];   // CSV vira array no componente
  tipoVaga: string;
  area: string;
  horario: string;
  tempoVoluntariado: string;
  disponibilidade: string;
  cidade: string;
  latitude: number;
  longitude: number;
  instituicao: { id: number };
}

@Injectable({ providedIn: 'root' })
export class VagasInstituicaoService {
  private readonly baseUrl = `${environment.apiUrl}/vagasInstituicao`;

  constructor(private http: HttpClient) {}

  cadastrarVaga(vaga: VagaInstituicao): Observable<VagaInstituicao> {
    // Se você já usa AuthTokenInterceptor, não precisa de headers aqui.
    // Fallback opcional (caso o interceptor não esteja configurado):
    let headers: HttpHeaders | undefined;
    const token = localStorage.getItem('token');
    if (token) {
      headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    }

    const payload: VagaInstituicao = {
      ...vaga,
      instituicao: { id: vaga.instituicao.id },
    };

    return this.http.post<VagaInstituicao>(this.baseUrl, payload, { headers }).pipe(
      catchError(this.handleError),
    );
  }

  listarVagas(params?: { instituicaoId?: number }): Observable<VagaInstituicao[]> {
    const httpParams = params?.instituicaoId
      ? new HttpParams().set('instituicaoId', String(params.instituicaoId))
      : undefined;

    return this.http.get<VagaInstituicao[]>(this.baseUrl, { params: httpParams }).pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: any): Observable<never> {
    const msg =
      error?.error instanceof ErrorEvent
        ? `Erro do cliente: ${error.error.message}`
        : `Erro ${error?.status || ''} ${error?.statusText || ''}`.trim() || 'Erro desconhecido.';
    return throwError(() => new Error(msg));
  }
}
