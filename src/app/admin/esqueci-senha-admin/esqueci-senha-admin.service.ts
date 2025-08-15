import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface VerificaEmailResponse {
  existe: boolean;
  id?: number;
  nome?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EsqueciSenhaAdminService {
  // Ajuste a URL conforme seu backend
  private url = 'http://localhost:8080/api/v1/admin/auth';

  constructor(private http: HttpClient) {}

  /** Etapa 1: verifica se o email existe no banco */
  verificarEmail(email: string): Observable<VerificaEmailResponse> {
    // pode ser GET ?email=... ou POST; ajuste conforme seu backend
    return this.http.get<VerificaEmailResponse>(`${this.url}/forgot/exists`, { params: { email } }).pipe(
      tap(res => console.log('🔎 Verificar e-mail:', email, '→', res)),
      catchError(this.handleError)
    );
  }

  /** Etapa 2: redefine a senha diretamente via e-mail (sem token) */
  redefinirSenha(email: string, novaSenha: string): Observable<void> {
    const payload = { email, senha: novaSenha };
    return this.http.post<void>(`${this.url}/forgot/reset`, payload).pipe(
      tap(() => console.log('🔐 Senha redefinida para:', email)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('📛 Erro (esqueci-senha admin):', error);
    let msg = 'Erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      msg = `Erro do cliente: ${error.error.message}`;
    } else if (error.status) {
      const body = typeof error.error === 'string' ? error.error : JSON.stringify(error.error);
      msg = `Erro ${error.status}: ${body}`;
    }
    return throwError(() => new Error(msg));
  }
}
