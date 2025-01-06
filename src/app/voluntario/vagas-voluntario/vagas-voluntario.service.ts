import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Vaga {
  id?: number;  // O ID é opcional porque novas vagas ainda não terão um ID
  instituicao: string;
  cargo: string;
  localidade: string;
  descricao: string;
  especificacoes: string[];
}

@Injectable({
  providedIn: 'root',
})
export class VagasVoluntarioService {
  private vagasUrl = 'http://localhost:8080/api/vagasInstituicao';
  private candidaturasUrl = 'http://localhost:8080/api/candidaturas'; // Endpoint de candidatura
  private vagasDisponiveisUrl = 'http://localhost:8080/api/vagasDisponiveis'; // Novo endpoint para vagas no mercado

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private voluntarioNome: string = 'Aluno'; // Nome padrão, será substituído após o login

  constructor(private http: HttpClient) {}

  // Método para buscar todas as vagas disponíveis no mercado
  getVagasDisponiveis(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(this.vagasDisponiveisUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Método para buscar todas as vagas da instituição
  getVagas(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(this.vagasUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Função para candidatar-se a uma vaga
  candidatarVaga(voluntarioId: number, vagaId: number): Observable<any> {
    if (!voluntarioId || !vagaId) {
      console.error('Voluntário ID ou Vaga ID estão inválidos');
      return throwError(
        'Voluntário ou vaga inválida'
      ); // Lança um erro se os IDs forem inválidos
    }

    const candidatura = {
      voluntarioId,
      vagaId,
      dataCandidatura: new Date(), // Inclui a data atual
    };

    console.log('Enviando candidatura:', candidatura);
    return this.http.post(this.candidaturasUrl, candidatura, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Função para definir o nome do voluntário
  setVoluntarioNome(nome: string): void {
    this.voluntarioNome = nome;
    localStorage.setItem('voluntarioNome', nome); // Salva o nome no localStorage
  }

  // Função para retornar o nome do voluntário
  getVoluntarioNome(): string {
    const nomeSalvo = localStorage.getItem('voluntarioNome');
    return nomeSalvo ? nomeSalvo : this.voluntarioNome;
  }

  // Tratamento de erros para requisições HTTP
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Erro na comunicação com o servidor';

    if (error.status === 400) {
      errorMessage = 'Dados inválidos enviados. Verifique os campos.';
    } else if (error.status === 500) {
      errorMessage = 'Erro interno no servidor. Tente novamente mais tarde.';
    }

    console.error('Ocorreu um erro na requisição:', error);
    return throwError(() => new Error(errorMessage));
  }
}
