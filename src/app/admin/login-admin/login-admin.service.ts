import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Admin {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  papel?: string;
}

export interface AdminLoginResponse {
  token: string;
  id: number;
  nome: string;
  papel?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginAdminService {
  // ajuste a URL conforme seu backend
  private url = 'http://localhost:8080/api/v1/admin/auth';
  aceiteLgpd!: boolean;

  constructor(private http: HttpClient) {}

  /** Login do administrador */
  login(user: { email: string; senha: string }): Observable<AdminLoginResponse> {
    const payload = { email: user.email, senha: user.senha };

    console.log('📤 POST login admin:', payload);

    return this.http.post<AdminLoginResponse>(`${this.url}/login`, payload).pipe(
      tap((res) => {
        console.log('✅ JWT admin:', res.token);
        localStorage.setItem('tokenAdmin', res.token);
        localStorage.setItem('adminEmail', user.email);
        localStorage.setItem('adminId', String(res.id));
        localStorage.setItem('adminNome', res.nome);
        if (res.papel) localStorage.setItem('adminPapel', res.papel);
      }),
      catchError(this.handleError)
    );
  }

  /** Cadastro de administrador */
  register(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${this.url}/register`, admin).pipe(
      tap((res) => console.log('👤 Admin registrado:', res)),
      catchError(this.handleError)
    );
  }

  /** Logout */
  logout(): void {
    localStorage.removeItem('tokenAdmin');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminNome');
    localStorage.removeItem('adminPapel');
  }

  /** Verifica se está logado */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('tokenAdmin');
  }

  /** Tratamento de erros (mesmo padrão do serviço da instituição) */
  private handleError(error: any): Observable<never> {
    console.error('📛 Erro bruto (admin):', error);

    let errorMessage = 'Erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro do cliente: ${error.error.message}`;
    } else if (error.status) {
      const msg = typeof error.error === 'string' ? error.error : JSON.stringify(error.error);
      errorMessage = `Erro ${error.status}: ${msg}`;
    } else {
      errorMessage = `Erro inesperado: ${JSON.stringify(error)}`;
    }

    console.error('📛 Erro tratado (admin):', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
