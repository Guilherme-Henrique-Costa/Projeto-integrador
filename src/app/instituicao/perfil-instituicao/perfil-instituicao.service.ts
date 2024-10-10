import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface PerfilInstituicao {
  id?: number;
  cnpj: number;
  email: string;
  password: string;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class PerfilInstituicaoService {
  private apiUrl = 'http://localhost:8080/api/v1/perfil-instituicao';

  constructor(private http: HttpClient) {}

  // Obter todos os perfis de instituições
  findAll(): Observable<PerfilInstituicao[]> {
    return this.http.get<PerfilInstituicao[]>(`${this.apiUrl}/all`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Obter perfil de instituição pelo ID
  findById(id: number): Observable<PerfilInstituicao> {
    return this.http.get<PerfilInstituicao>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Criar novo perfil de instituição
  create(perfilInstituicao: PerfilInstituicao): Observable<PerfilInstituicao> {
    return this.http.post<PerfilInstituicao>(this.apiUrl, perfilInstituicao)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Atualizar perfil de instituição existente
  update(id: number, perfilInstituicao: PerfilInstituicao): Observable<PerfilInstituicao> {
    return this.http.put<PerfilInstituicao>(`${this.apiUrl}/${id}`, perfilInstituicao)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Deletar perfil de instituição
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Tratamento de erros
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido!';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = `Erro ${error.status}: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
