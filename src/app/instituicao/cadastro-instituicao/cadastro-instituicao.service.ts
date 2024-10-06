import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Instituicao {
  id?: number;
  name: string;
  email: string;
  cnpj: string;
  password: string;
  interestArea: string;
  competence: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CadastroInstituicaoService {
  private apiUrl = 'http://localhost:8080/api/instituicoes'; // URL base da API para cadastro

  constructor(private http: HttpClient) {}

  // Método para enviar os dados de cadastro para o back-end
  cadastrarInstituicao(instituicao: Instituicao): Observable<Instituicao> {
    return this.http.post<Instituicao>(this.apiUrl, instituicao);
  }

  // Método opcional para validar se um CNPJ já está cadastrado
  verificarCnpj(cnpj: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verificar-cnpj?cnpj=${cnpj}`);
  }
}
