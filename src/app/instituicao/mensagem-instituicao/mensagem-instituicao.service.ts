import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface MensagemVoluntaria {
  id?: number;
  voluntarioNome: string;     // remetente visível
  mensagemVoluntario: string; // conteúdo
  ehUsuario: boolean;         // true = voluntário, false = instituição
  dataHora: string;           // ISO string
  voluntario: { id: number };
  // client-only (estado otimista)
  _pending?: boolean;
}

export interface ConversaResumo {
  voluntarioId: number;
  voluntarioNome: string;
  ultimaMensagem: string;
  ultimaData: string;   // ISO
  naoLidas: number;
}

@Injectable({ providedIn: 'root' })
export class MensagemInstituicaoService {
  private readonly baseUrl = `${environment.apiUrl}/mensagem-voluntaria`;

  // Se você já usa AuthTokenInterceptor, pode remover estes headers.
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getMensagensPorVoluntario(voluntarioId: number): Observable<MensagemVoluntaria[]> {
    return this.http
      .get<MensagemVoluntaria[]>(`${this.baseUrl}/voluntario/${voluntarioId}/mensagens`)
      .pipe(catchError(this.handleError));
  }

  enviarMensagem(mensagem: MensagemVoluntaria): Observable<MensagemVoluntaria> {
    return this.http
      .post<MensagemVoluntaria>(this.baseUrl, mensagem, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getConversas(voluntarioId: number): Observable<ConversaResumo[]> {
    return this.http
      .get<ConversaResumo[]>(`${this.baseUrl}/voluntario/${voluntarioId}/conversas`)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: any) {
    const msg =
      err?.error?.message ??
      (err?.status ? `Erro ${err.status} ${err.statusText || ''}`.trim() : 'Erro desconhecido.');
    return throwError(() => new Error(msg));
  }
}
