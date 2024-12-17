import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Define a interface para VagaInstituicao
export interface VagaInstituicao {
  id?: number;
  cargo: string;
  localidade: string;
  descricao: string;
  especificacoes: string[];
  tipoVaga: string;
  area: string;
  horario: string;
  tempoVoluntariado: string;
  disponibilidade: string;
  instituicao: { id: number };
  }

@Injectable({
  providedIn: 'root'
})
export class VagasInstituicaoService {

  // URL da API do backend
  private vagasUrl = 'http://localhost:8080/api/vagasInstituicao';  // Certifique-se de que este endpoint está correto

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  cadastrarVaga(vaga: VagaInstituicao): Observable<VagaInstituicao> {
    const payload = {
      ...vaga,
      instituicao: { id: vaga.instituicao.id },
    };

    console.log('Payload enviado:', payload);

    return this.http.post<VagaInstituicao>(this.vagasUrl, payload, this.httpOptions).pipe(
      catchError((error) => {
        console.error('Erro na requisição:', error);
        return throwError(() => new Error('Erro na comunicação com o servidor.'));
      })
    );
  }


  // Método para listar todas as vagas cadastradas pela instituição (opcional)
  listarVagas(): Observable<VagaInstituicao[]> {
    return this.http.get<VagaInstituicao[]>(this.vagasUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Tratamento de erros para requisições HTTP
  private handleError(error: any): Observable<never> {
    console.error('Erro detalhado:', error);  // Aqui você pode ver detalhes da resposta de erro
    return throwError(() => new Error('Erro na comunicação com o servidor. Tente novamente mais tarde.'));
  }
}
