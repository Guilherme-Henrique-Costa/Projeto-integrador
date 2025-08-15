import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Admin {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  funcao?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CadastroAdminService {
  private url = 'http://localhost:8080/api/v1/admin/auth';

  constructor(private http: HttpClient) {}

  registrar(admin: Admin): Observable<Admin> {
    const payload = {
      nome: admin.nome,
      email: admin.email,
      senha: admin.senha,
      funcao: admin.funcao
    };

    return this.http.post<Admin>(`${this.url}/register`, payload).pipe(
      tap(res => console.log('✅ Admin registrado:', res)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('📛 Erro cadastro admin:', error);
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
