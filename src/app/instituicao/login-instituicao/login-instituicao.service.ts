import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:8080/api/v1/instituicao'; // URL base do backend

  aceiteLgpd!: boolean;

  constructor(private http: HttpClient) {}

  // Método para realizar o login do usuário
  login(user: { email: string; senha: string }): Observable<Usuario> {
    const params = new HttpParams()
      .set('email', user.email)
      .set('password', user.senha);

    return this.http.post<Usuario>(`${this.url}/login`, {}, { params }).pipe(
      tap((response: Usuario) => {
        // Não há mais token, armazenar apenas as informações úteis localmente, se necessário
        localStorage.setItem('userEmail', response.email);
      }),
      catchError(this.handleError)
    );
  }

  // Método para tratar erros da requisição HTTP
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = `Erro ${error.status}: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  // Método para logout: remove as informações de autenticação do localStorage
  logout(): void {
    localStorage.removeItem('userEmail');
  }

  // Verifica se o usuário está logado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userEmail'); // Retorna verdadeiro se houver um email armazenado
  }

  // Métodos para gerenciar a aceitação dos termos de privacidade (LGPD)
  setAceite(aceite: boolean): void {
    this.aceiteLgpd = aceite;
  }

  getAceite(): boolean {
    return this.aceiteLgpd;
  }
}
