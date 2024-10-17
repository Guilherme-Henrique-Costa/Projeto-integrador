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
        if (response && response.email && response.id) {  // Verifique se as propriedades existem
          localStorage.setItem('userEmail', response.email);
          localStorage.setItem('userId', response.id.toString());
        } else {
          throw new Error('Resposta de login incompleta');
        }
      }),
      catchError(this.handleError)
    );
}

  // Método para logout
  logout(): Observable<any> {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    return this.http.post(`${this.url}/logout`, {}); // Envia requisição de logout
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

  private isSenhaValida(senha: string): boolean {
    return senha.length >= 6; // Exigir que a senha tenha no mínimo 6 caracteres
  }


}
