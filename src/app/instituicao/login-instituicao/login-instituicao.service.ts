import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Instituicao {
   id?: number;
  nome: string;
  cnpj: string;
  email: string;
  password: string;
  description: string;
  telefoneContato: string;
  endereco: string;
  areaAtuacao: string[];
  causasApoio: string[];
  habilidadesRequeridas: string[];
  responsavelPreenchimento: string;
  nomeContatoVoluntariado: string;
  funcaoContatoVoluntariado: string;
  telefoneContatoVoluntariado: string;
  semFinsLucrativos: string;
  constituidaFormalmente: string;
  emAtividade: string;
  sedeDesvinculada: string;
  prestadoraServicos: string;
  interesseRH: string;
  prestarInfosCEUB: string;
  avaliadaCEUB: string;
  motivoInteresseVoluntarios: string;
  enderecoTrabalhoVoluntario: string;
  horasMensaisVoluntario: string;
  contatosRepassadosVoluntarios: string;
  comentariosSugestoes: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:8080/api/v1/instituicao'; // URL base do backend
  aceiteLgpd!: boolean; // Gerenciar aceitação dos termos de privacidade

  constructor(private http: HttpClient) {}

  login(user: { email: string; senha: string }): Observable<string> {
    const loginPayload = {
      email: user.email,
      password: user.senha,
    };

    console.log('📤 Requisição POST para login:', loginPayload);

    return this.http.post<string>(`${this.url}/login`, loginPayload).pipe(
      tap((token: string) => {
        console.log('✅ JWT recebido:', token);
        localStorage.setItem('token', token);
        localStorage.setItem('userEmail', user.email);
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
