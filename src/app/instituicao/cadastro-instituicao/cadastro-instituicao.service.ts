import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Instituicao {
  id?: number;
  nome: string;
  cnpj: string;
  email: string;
  password: string;
  areaAtuacao: string;
  description: string;
  endereco: string;
  nomeResponsavel: string;
  cpfResponsavel: string;
}

@Injectable({
  providedIn: 'root',
})
export class CadastroInstituicaoService {
  private apiUrl = 'http://localhost:8080/api/v1/cadastro-instituicao';

  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  cadastrarInstituicao(instituicao: Instituicao): Observable<Instituicao> {
    return this.http.post<Instituicao>(this.apiUrl, instituicao, this.httpOptions).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = 'Os dados enviados são inválidos. Por favor, revise o formulário.';
          break;
        case 403:
          errorMessage = 'Acesso negado. Você não tem permissão para realizar esta operação.';
          break;
        case 404:
          errorMessage = 'O recurso solicitado não foi encontrado. Verifique a URL.';
          break;
        case 500:
          errorMessage = 'Erro no servidor. Tente novamente mais tarde.';
          break;
        default:
          errorMessage = `Erro ${error.status}: ${error.message}`;
      }
    }
    console.error('Erro capturado:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
