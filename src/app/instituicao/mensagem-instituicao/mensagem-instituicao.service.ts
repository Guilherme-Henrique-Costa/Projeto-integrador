import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface MensagemVoluntaria {
  id?: number;
  voluntarioNome: string;     // nome de quem enviou (instituição ou voluntário)
  mensagemVoluntario: string; // conteúdo
  ehUsuario: boolean;         // true = voluntário, false = instituição
  dataHora: string;           // ISO string
  voluntario: { id: number };
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
    return this.http.get<MensagemVoluntaria[]>(`${this.baseUrl}/voluntario/${voluntarioId}/mensagens`);
  }

  enviarMensagem(mensagem: MensagemVoluntaria): Observable<MensagemVoluntaria> {
    return this.http.post<MensagemVoluntaria>(this.baseUrl, mensagem, this.httpOptions);
  }

  getConversas(voluntarioId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/voluntario/${voluntarioId}/conversas`);
  }
}
