import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Voluntario {
  id: number;
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:8080/api/v1/voluntario'; // URL do backend

  constructor(private http: HttpClient) {}

  // Método para realizar o login do voluntário
  login(user: { email: string; password: string }): Observable<Voluntario> {
    return this.http.post<Voluntario>(`${this.url}/login`, user).pipe(
      tap((response: Voluntario) => {
        console.log('Resposta do servidor:', response); // Adicione isto para depuração
        if (response && response.email && response.id && response.nome) {
          localStorage.setItem('userEmail', response.email);
          localStorage.setItem('userId', response.id.toString());
          localStorage.setItem('userName', response.nome);
        } else {
          throw new Error('Resposta de login incompleta');
        }
      }),
      catchError(this.handleError)
    );
  }

  // Método para logout
  logout(): void {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');  // Remove o nome do voluntário também
  }

  // Verifica se o voluntário está logado
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
