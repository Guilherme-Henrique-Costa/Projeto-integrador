import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface PerfilInstituicao {
  id?: number;
  cnpj: string;      // ⚠️ string para manter zeros à esquerda
  email: string;
  password: string;
  nome: string;
}

@Injectable({ providedIn: 'root' })
export class PerfilInstituicaoService {
  private readonly baseUrl = `${environment.apiUrl}/perfil-instituicao`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<PerfilInstituicao[]> {
    return this.http.get<PerfilInstituicao[]>(`${this.baseUrl}/all`).pipe(catchError(this.handleError));
  }

  findById(id: number): Observable<PerfilInstituicao> {
    return this.http.get<PerfilInstituicao>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  create(perfil: PerfilInstituicao): Observable<PerfilInstituicao> {
    return this.http.post<PerfilInstituicao>(this.baseUrl, perfil).pipe(catchError(this.handleError));
  }

  update(id: number, perfil: PerfilInstituicao): Observable<PerfilInstituicao> {
    return this.http.put<PerfilInstituicao>(`${this.baseUrl}/${id}`, perfil).pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  findByEmail(email: string): Observable<PerfilInstituicao> {
    const params = new HttpParams().set('email', email);
    return this.http.get<PerfilInstituicao>(`${this.baseUrl}/email`, { params }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const msg =
      error.error instanceof ErrorEvent
        ? `Erro do cliente: ${error.error.message}`
        : `Erro ${error.status}${error.statusText ? ` - ${error.statusText}` : ''}`;
    return throwError(() => new Error(msg));
  }
}
