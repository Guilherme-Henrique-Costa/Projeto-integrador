import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface PerfilInstituicao {
  id?: number;
  nome: string;
  cnpj: number;
  email: string;
  password: string;
  interestArea: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CadastroInstituicaoService {
  private apiUrl = 'http://localhost:8080/api/v1/perfil-instituicao';

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
      errorMessage = `Erro ${error.status}: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
