import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Instituicao {
  id: number;
  nome: string;
  email: string;
  cnpj: string;
  endereco: string;
  nomeResponsavel: string;
  cpfResponsavel: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:8080/api/v1/instituicao'; // URL base do backend
  aceiteLgpd!: boolean; // Gerenciar aceitação dos termos de privacidade

  constructor(private http: HttpClient) {}

  // Método para realizar o login da instituição
  login(user: { email: string; senha: string }): Observable<Instituicao> {
    return this.http.post<Instituicao>(`${this.url}/login`, {
      email: user.email,
      password: user.senha
    }).pipe(
      tap((response: Instituicao) => {
        localStorage.setItem('userEmail', response.email);
        localStorage.setItem('userName', response.nome);
      }),
      catchError(this.handleError)
    );
  }


  // Método para registrar uma instituição
  register(instituicao: Instituicao): Observable<Instituicao> {
    return this.http.post<Instituicao>(`${this.url}/register`, instituicao).pipe(
      tap((response: Instituicao) => {
        console.log('Instituição registrada:', response);
      }),
      catchError(this.handleError)
    );
  }

  // Método para tratar erros da requisição HTTP
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Erro ${error.status}: ${error.error}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  // Método para logout: remove as informações de autenticação do localStorage
  logout(): void {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
  }

  // Verifica se o usuário está logado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userEmail'); // Retorna verdadeiro se houver um email armazenado
  }
}
