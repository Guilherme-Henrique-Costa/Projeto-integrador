import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:8080/api/usuarios'; // URL base do backend

  aceiteLgpd!: boolean;

  constructor(private http: HttpClient) {}

  // Método para realizar o login do usuário
  login(user: { email: string; senha: string }): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}/login`, user);
  }

  setAceite(aceite: boolean) {
    this.aceiteLgpd = aceite;
  }

  getAceite(): boolean {
    return this.aceiteLgpd;
  }
}
