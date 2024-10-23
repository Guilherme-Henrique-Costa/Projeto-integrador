import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define a interface Vaga aqui mesmo
export interface Vaga {
  id?: number;  // O ID é opcional porque novas vagas ainda não terão um ID
  titulo: string;
  instituicao: string;
  cargo: string;
  localidade: string;
  descricao: string;
  especificacoes: string[];
}

@Injectable({
  providedIn: 'root'
})
export class VagasVoluntarioService {

  // URL para a API de vagas específicas para voluntários
  private vagasUrl = 'http://localhost:8080/api/vagasVoluntario';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private voluntarioNome: string = 'Aluno'; // Nome padrão, será substituído após o login

  constructor(private http: HttpClient) {}

  // Método para buscar as vagas do backend
  getVagas(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(this.vagasUrl).pipe(
      catchError(this.handleError)  // Adiciona tratamento de erros
    );
  }

  // Método para criar uma nova vaga
  criarVaga(vaga: Vaga): Observable<Vaga> {
    return this.http.post<Vaga>(this.vagasUrl, vaga, this.httpOptions).pipe(
      catchError(this.handleError)  // Adiciona tratamento de erros
    );
  }

  // Função para definir o nome do voluntário
  setVoluntarioNome(nome: string): void {
    this.voluntarioNome = nome;
    localStorage.setItem('voluntarioNome', nome);  // Salva o nome no localStorage
  }

  // Função para retornar o nome do voluntário
  getVoluntarioNome(): string {
    const nomeSalvo = localStorage.getItem('voluntarioNome');
    return nomeSalvo ? nomeSalvo : this.voluntarioNome;
  }

  // Tratamento de erros para requisições HTTP
  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro na requisição:', error);
    return throwError(() => new Error('Erro na comunicação com o servidor. Tente novamente mais tarde.'));
  }
}
