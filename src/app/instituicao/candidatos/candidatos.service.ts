import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Candidatura {
   voluntarioId: number;
  vagaId: number;
  nomeVoluntario: string;
  emailVoluntario: string;
  dataCandidatura: Date;
  status: string;
}

export interface Vaga {
  id: number;
  cargo: string;
  localidade: string;
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class CandidatosService {
  private candidatosUrl = 'http://localhost:8080/api/v1/candidaturas/vaga';  // Endpoint para listar candidatos por vaga
  private vagasComCandidatosUrl = 'http://localhost:8080/api/v1/vagasInstituicao/com-candidatos';  // Endpoint para listar vagas com candidatos

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Método para listar candidatos de uma vaga específica
  listarCandidatos(vagaId: number): Observable<Candidatura[]> {
  const url = `${this.candidatosUrl}/${vagaId}`;
  console.log('[CandidatosService] GET', url);
  return this.http.get<Candidatura[]>(url, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}

  // Método para listar vagas com candidatos
  listarVagasComCandidatos(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(this.vagasComCandidatosUrl, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Erro ao buscar os dados.'));
  }
}
