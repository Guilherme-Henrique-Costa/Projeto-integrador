import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:8080/api/v1/auth/instituicao';
  aceiteLgpd!: boolean;

  constructor(private http: HttpClient) {}

  // Método de login da instituição
  login(user: { email: string; senha: string }): Observable<InstituicaoLoginResponse> {
    const loginPayload = {
      email: user.email,
      senha: user.senha,
    };

    console.log('📤 Requisição POST para login:', loginPayload);

    return this.http.post<InstituicaoLoginResponse>(`${this.url}/login`, loginPayload).pipe(
      tap((response) => {
        console.log('✅ JWT recebido:', response.token);
        localStorage.setItem('tokenInstituicao', response.token);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('instituicaoId', response.id.toString());
        localStorage.setItem('userName', response.nome); // <- salvando nome da instituição
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

  // Tratamento de erros
  private handleError(error: any): Observable<never> {
  console.error('📛 Erro bruto retornado pela API:', error);

  let errorMessage = 'Erro desconhecido!';

  if (error.error instanceof ErrorEvent) {
    // Erro de cliente
    errorMessage = `Erro do cliente: ${error.error.message}`;
  } else if (error.status) {
    // Erro HTTP (sem corpo JSON esperado)
    const msg = typeof error.error === 'string' ? error.error : JSON.stringify(error.error);
    errorMessage = `Erro ${error.status}: ${msg}`;
  } else {
    // Fallback
    errorMessage = `Erro inesperado: ${JSON.stringify(error)}`;
  }

  console.error('📛 Erro tratado:', errorMessage);
  return throwError(() => new Error(errorMessage));
}

  // Método de logout
  logout(): void {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('instituicaoId');
    localStorage.removeItem('token');
  }

  // Verifica se está logado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userEmail');
  }
}
