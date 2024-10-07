import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PerfilInstituicao {
  id?: number;
  name: string;           // Nome da instituição
  email: string;          // E-mail da instituição
  cnpj: string;           // CNPJ da instituição
  password: string;       // Senha de acesso
  interestArea: string;   // Área de interesse
  competence: string;     // Competência específica
  description: string;    // Descrição da instituição
}

@Injectable({
  providedIn: 'root'
})
export class CadastroInstituicaoService {
  private apiUrl = 'http://localhost:8080/api/v1/perfil-instituicao'; // URL base da API para cadastro de PerfilInstituicao

  constructor(private http: HttpClient) {}

  // Método para enviar os dados de cadastro para o back-end
  cadastrarPerfilInstituicao(perfilInstituicao: PerfilInstituicao): Observable<PerfilInstituicao> {
    return this.http.post<PerfilInstituicao>(this.apiUrl, perfilInstituicao);
  }

  // Método opcional para validar se um CNPJ já está cadastrado (caso seja necessário)
  verificarCnpj(cnpj: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verificar-cnpj?cnpj=${cnpj}`);
  }
}
