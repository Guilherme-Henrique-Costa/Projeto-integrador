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

  findAll(): Observable<PerfilInstituicao[]> {
    return this.http.get<PerfilInstituicao[]>(`${this.apiUrl}/all`)
      .pipe(catchError(this.handleError));
  }

  findById(id: number): Observable<PerfilInstituicao> {
    return this.http.get<PerfilInstituicao>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(perfilInstituicao: PerfilInstituicao): Observable<PerfilInstituicao> {
    return this.http.post<PerfilInstituicao>(this.apiUrl, perfilInstituicao)
      .pipe(catchError(this.handleError));
  }

  update(id: number, perfilInstituicao: PerfilInstituicao): Observable<PerfilInstituicao> {
    return this.http.put<PerfilInstituicao>(`${this.apiUrl}/${id}`, perfilInstituicao)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  findByEmail(email: string): Observable<PerfilInstituicao> {
    return this.http.get<PerfilInstituicao>(`${this.apiUrl}/email`, {
      params: { email }
    }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.error instanceof ErrorEvent
      ? `Erro: ${error.error.message}`
      : `Erro ${error.status}: ${error.message}`;
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
