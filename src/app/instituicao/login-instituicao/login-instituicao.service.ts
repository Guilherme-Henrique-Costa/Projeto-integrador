import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://localhost:8080/api/usuarios'; // URL do backend para o login
  private aceiteLgpd: boolean = false; // Variável para guardar se o usuário aceitou os termos ou não.

  constructor(private http: HttpClient) {}

  // Fazendo o login: enviamos o email e a senha para o backend.
  loginInstituicao(user: { email: string; senha: string }): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}/login`, user);
  }

  // Salvando se o usuário aceitou os termos
  setAceite(aceite: boolean): void {
    this.aceiteLgpd = aceite;
  }

  // Retornando se o usuário aceitou os termos
  getAceite(): boolean {
    return this.aceiteLgpd;
  }
}
