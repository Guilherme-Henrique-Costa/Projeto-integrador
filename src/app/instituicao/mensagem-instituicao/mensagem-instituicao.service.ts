import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MensagemVoluntaria {
  id?: number;
  voluntarioNome: string;
  mensagemVoluntario: string;
  ehUsuario: boolean;
  dataHora: string;
  voluntario: { id: number };
}

@Injectable({ providedIn: 'root' })
export class MensagemInstituicaoService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/mensagem-voluntaria';
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getMensagensPorVoluntario(voluntarioId: number): Observable<MensagemVoluntaria[]> {
    const url = `${this.baseUrl}/voluntario/${voluntarioId}/mensagens`;
    return this.http.get<MensagemVoluntaria[]>(url);
  }

  enviarMensagem(mensagem: MensagemVoluntaria): Observable<MensagemVoluntaria> {
    return this.http.post<MensagemVoluntaria>(this.baseUrl, mensagem, this.httpOptions);
  }

  getConversas(voluntarioId: number): Observable<any> {
    const url = `${this.baseUrl}/voluntario/${voluntarioId}/conversas`;
    return this.http.get<any>(url);
  }
}
