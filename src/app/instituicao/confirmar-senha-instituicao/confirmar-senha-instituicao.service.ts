import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfirmarSenhaInstituicaoService {
  private apiUrl = 'http://localhost:8080/api/v1/instituicao'; // ajuste a rota conforme seu backend

  constructor(private http: HttpClient) {}

  /** Etapa 1: verificar e-mail da instituição */
  verificarEmail(email: string): Observable<{ existe: boolean; id?: number; nome?: string }> {
    return this.http.get<any>(`${this.apiUrl}/verificar-email?email=${email}`).pipe(
      map(res => ({
        existe: res && res.existe,
        id: res?.id,
        nome: res?.nome
      })),
      catchError(err => {
        console.error('Erro ao verificar e-mail:', err);
        return throwError(() => new Error('Falha ao verificar o e-mail.'));
      })
    );
  }

  /** Etapa 2: redefinir senha */
  redefinirSenha(email: string, novaSenha: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/redefinir-senha`, { email, senha: novaSenha }).pipe(
      catchError(err => {
        console.error('Erro ao redefinir senha:', err);
        return throwError(() => new Error('Não foi possível redefinir a senha.'));
      })
    );
  }
}
