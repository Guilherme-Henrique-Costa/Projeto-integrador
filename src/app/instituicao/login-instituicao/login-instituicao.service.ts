import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Instituicao {
  id?: number;
  nome: string;
  cnpj: string;
  email: string;
  senha: string;
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

export interface InstituicaoLoginResponse {
  token: string;
  id: number;
  nome: string;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  // deixe apiUrl em environment.ts: ex: http://localhost:8080/api/v1
  private readonly baseUrl = `${environment.apiUrl}/auth/instituicao`;

  constructor(private http: HttpClient) {}

  login(payload: { email: string; senha: string }): Observable<InstituicaoLoginResponse> {
    return this.http
      .post<InstituicaoLoginResponse>(`${this.baseUrl}/login`, payload)
      .pipe(
        tap((res) => {
          // padronize as chaves: use sempre 'token', 'userEmail', 'instituicaoId', 'userName'
          localStorage.setItem('token', res.token);
          localStorage.setItem('userEmail', payload.email);
          localStorage.setItem('instituicaoId', String(res.id));
          localStorage.setItem('userName', res.nome);
        }),
        catchError(this.handleError),
      );
  }

  register(instituicao: Instituicao): Observable<Instituicao> {
    return this.http
      .post<Instituicao>(`${this.baseUrl}/register`, instituicao)
      .pipe(catchError(this.handleError));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('instituicaoId');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  private handleError(error: any): Observable<never> {
    // mensagens mais limpas e previsíveis
    let message = 'Erro desconhecido.';
    if (error?.error instanceof ErrorEvent) {
      message = `Erro do cliente: ${error.error.message}`;
    } else if (typeof error?.error === 'string') {
      message = error.error;
    } else if (error?.status) {
      message = `Erro ${error.status}${error.statusText ? ` - ${error.statusText}` : ''}`;
    }
    return throwError(() => new Error(message));
  }
}
