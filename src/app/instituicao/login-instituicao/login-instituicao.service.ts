import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = '';
  aceiteLgpd!: boolean;
  constructor(private http: HttpClient) {
  }

  // usuarioPorCpf(cpf: String): Observable<Usuario> {
  //   return this.http.get<Usuario>(`${this.url}/cpf?cpf=${cpf}`);
  // }

  // login(user: any) {
  //   return this.http.post(`${this.url}/login`, user);
  // }

  // buscarCpfCadastrado(cpf: any): Observable<any> {
  //   return this.http.get<any>(`${this.url}/login?cpf=${cpf}`);
  // }

  // verificarCPFAutorizado(cpf: string) {
  //   return this.http.get<any>(`${this.url}/buscar-cpf-autorizado?cpf=${cpf}`);
  // }

  setAceite(aceite: boolean) {
    this.aceiteLgpd = aceite;
  }

  getAceite(){
    return this.aceiteLgpd;
  }
}
