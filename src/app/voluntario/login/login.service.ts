import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Voluntario {
  id: number;
  nome: string;
  emailInstitucional: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:8080/api/v1/voluntario'; // URL do backend

  aceiteLgpd!: boolean;

  constructor(private http: HttpClient) {}

  // Método para realizar o login do voluntário
    login(user: { emailInstitucional: string; password: string }): Observable<Voluntario> {
    return this.http.post<Voluntario>(`${this.url}/login`, user).pipe(
      tap(response => {
        localStorage.setItem('userEmail', response.emailInstitucional);
        localStorage.setItem('userId', response.id.toString());
        localStorage.setItem('userName', response.nome);
      }),
      catchError((error: HttpErrorResponse) => {
        let msg = error.status === 403
          ? 'Credenciais inválidas. Verifique seu email e senha.'
          : `Erro ${error.status}: ${error.message}`;
        return throwError(() => new Error(msg));
      })
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

  // Métodos para gerenciar a aceitação dos termos de privacidade (LGPD)
  setAceite(aceite: boolean): void {
    this.aceiteLgpd = aceite;
  }

  getAceite(): boolean {
    return this.aceiteLgpd;
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
