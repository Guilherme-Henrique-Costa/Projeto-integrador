import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface PerfilInstituicao {
  id?: number;
  nome: string;
  cnpj: string; // Mantido como string
  email: string;
  password: string;
  areaAtuacao: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CadastroInstituicaoService {
  private apiUrl = 'http://localhost:8080/api/v1/perfil-instituicao'; // URL do backend

  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  cadastrarPerfilInstituicao(perfilInstituicao: PerfilInstituicao): Observable<PerfilInstituicao> {
    return this.http.post<PerfilInstituicao>(this.apiUrl, perfilInstituicao, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = 'Requisição inválida. Verifique os dados enviados.';
          break;
        case 403:
          errorMessage = 'Acesso negado. Verifique suas credenciais.';
          break;
        case 404:
          errorMessage = 'Recurso não encontrado.';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
          break;
        default:
          errorMessage = `Erro ${error.status}: ${error.message}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
