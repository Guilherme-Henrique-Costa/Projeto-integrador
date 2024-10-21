import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Voluntario {
  id: number;
  nome: string;
  email: string;
}

export interface Instituicao {
  id: number;
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiVoluntarioUrl = 'http://localhost:8080/api/v1/voluntario'; // URL da API para voluntário
  private apiInstituicaoUrl = 'http://localhost:8080/api/v1/instituicao'; // URL da API para instituição

  constructor(private http: HttpClient) {}

  // Função para login de voluntário
  loginVoluntario(email: string, senha: string): Observable<Voluntario> {
    return this.http.post<Voluntario>(`${this.apiVoluntarioUrl}/login`, { email, senha }).pipe(
      tap((response: Voluntario) => {
        if (response && response.email && response.id && response.nome) {
          localStorage.setItem('userEmail', response.email);
          localStorage.setItem('userId', response.id.toString());
          localStorage.setItem('userName', response.nome);
        } else {
          throw new Error('Resposta de login do voluntário incompleta');
        }
      }),
      catchError(this.handleError)
    );
  }

  // Função para login de instituição
  loginInstituicao(email: string, senha: string): Observable<Instituicao> {
    return this.http.post<Instituicao>(`${this.apiInstituicaoUrl}/login`, { email, senha }).pipe(
      tap((response: Instituicao) => {
        if (response && response.email && response.id && response.nome) {
          localStorage.setItem('userEmail', response.email);
          localStorage.setItem('userId', response.id.toString());
          localStorage.setItem('instituicaoNome', response.nome); // Armazena o nome da instituição
        } else {
          throw new Error('Resposta de login da instituição incompleta');
        }
      }),
      catchError(this.handleError)
    );
  }

  // Função para logout (remove todos os dados do localStorage)
  logout(): void {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('instituicaoNome');
  }

  // Verifica se há algum usuário logado (voluntário ou instituição)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userEmail');
  }

  // Tratar erros da requisição HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Erro ${error.status}: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
