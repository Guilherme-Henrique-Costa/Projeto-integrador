import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface VoluntarioRef {
  id: number;
  nome?: string;
  emailInstitucional?: string;
}

export interface FeedbackVoluntario {
  id?: number;
  descricaoVaga: string;
  feedback: string;
  voluntario: VoluntarioRef;
}

@Injectable({ providedIn: 'root' })
export class FeedbackInstituicaoService {
  private readonly baseUrl = `${environment.apiUrl}/feedback-voluntario`;
  private readonly voluntariosUrl = `${environment.apiUrl}/voluntario/all`;

  constructor(private http: HttpClient) {}

  listAll(): Observable<FeedbackVoluntario[]> {
    return this.http.get<FeedbackVoluntario[]>(`${this.baseUrl}/all`).pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<FeedbackVoluntario> {
    return this.http.get<FeedbackVoluntario>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  /** Busca todos os voluntários cadastrados no banco */
  listVoluntarios(): Observable<VoluntarioRef[]> {
    return this.http.get<any[]>(this.voluntariosUrl).pipe(
      map(rows =>
        (rows || []).map(v => ({
          id: v.id,
          nome: v.nome ?? v.name ?? '',
          emailInstitucional: v.emailInstitucional ?? v.email ?? ''
        }) as VoluntarioRef)
      ),
      catchError(this.handleError)
    );
  }

  create(payload: FeedbackVoluntario): Observable<FeedbackVoluntario> {
    return this.http.post<FeedbackVoluntario>(this.baseUrl, payload, { headers: this.authHeaders() })
      .pipe(catchError(this.handleError));
  }

  update(id: number, payload: FeedbackVoluntario): Observable<FeedbackVoluntario> {
    return this.http.put<FeedbackVoluntario>(`${this.baseUrl}/${id}`, payload, { headers: this.authHeaders() })
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.authHeaders() })
      .pipe(catchError(this.handleError));
  }

  private authHeaders(): HttpHeaders | undefined {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
  }

  private handleError(error: any) {
    const msg =
      error?.error instanceof ErrorEvent
        ? `Erro do cliente: ${error.error.message}`
        : `Erro ${error?.status || ''} ${error?.statusText || ''}`.trim() || 'Erro desconhecido.';
    return throwError(() => new Error(msg));
  }
}
