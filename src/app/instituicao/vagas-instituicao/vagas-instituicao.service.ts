import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define a interface para VagaInstituicao
export interface VagaInstituicao {
  id?: number;
  cargo: string;
  localidade: string;
  descricao: string;
  especificacoes: string[];
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

@Injectable({
  providedIn: 'root'
})
export class VagasInstituicaoService {
  private vagasUrl = 'http://localhost:8080/api/v1/vagasInstituicao'; // Endpoint do backend

  constructor(private http: HttpClient) {}

  cadastrarVaga(vaga: VagaInstituicao): Observable<VagaInstituicao> {
    const token = localStorage.getItem('tokenInstituicao'); // Certifique-se de que está sendo salvo no login

    if (!token) {
      console.error('[VagasService] Token da instituição não encontrado.');
      return throwError(() => new Error('Instituição não autenticada.'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const payload = {
      ...vaga,
      instituicao: { id: vaga.instituicao.id },
    };

    console.log('[VagasService] Enviando payload para criação da vaga:', payload);

    return this.http.post<VagaInstituicao>(this.vagasUrl, payload, { headers }).pipe(
      catchError((error) => {
        console.error('[VagasService] Erro ao cadastrar vaga:', error);
        return throwError(() => new Error('Erro na comunicação com o servidor.'));
      })
    );
  }

  listarVagas(): Observable<VagaInstituicao[]> {
    return this.http.get<VagaInstituicao[]>(this.vagasUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro detalhado:', error);
    return throwError(() => new Error('Erro na comunicação com o servidor. Tente novamente mais tarde.'));
  }
}
