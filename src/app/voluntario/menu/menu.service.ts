import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private voluntarioNome: string = 'Aluno'; // Nome padrão, será substituído após o login
  private apiUrl = 'http://localhost:8080/api/voluntario'; // URL para o backend

  constructor(private http: HttpClient) {}

  // Função para definir o nome do voluntário localmente
  setVoluntarioNome(nome: string): void {
    this.voluntarioNome = nome;
    localStorage.setItem('voluntarioNome', nome); // Salvar localmente
  }

  // Função para retornar o nome do voluntário localmente
  getVoluntarioNome(): string {
    const nome = localStorage.getItem('voluntarioNome');
    return nome ? nome : this.voluntarioNome;
  }

  // Função para buscar o nome do voluntário do backend
  fetchVoluntarioNome(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
