import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Instituicao {
  id?: number;
  nome: string;
  cnpj: string;
  email: string;
  senha: string;

  telefoneContato: string;
  endereco: string;

  cep?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;

  description?: string;

  areaAtuacao: string[];
  causasApoio: string[];
  habilidadesRequeridas: string[];

  responsavelPreenchimento: string;
  nomeContatoVoluntariado: string;
  funcaoContatoVoluntariado: string;
  telefoneContatoVoluntariado: string;

  semFinsLucrativos: string;
  constituidaFormalmente: string;
  emAtividade: string;
  sedeDesvinculada?: string;
  prestadoraServicos?: string;
  interesseRH: string;
  prestarInfosCEUB: string;
  avaliadaCEUB: string;

  motivoInteresseVoluntarios: string;
  enderecoTrabalhoVoluntario: string;
  horasMensaisVoluntario: string;
  contatosRepassadosVoluntarios: string;
  comentariosSugestoes?: string;
}

@Injectable({ providedIn: 'root' })
export class CadastroInstituicaoService {
  // ⚠️ garante a barra antes do recurso
  private readonly apiUrl = `${environment.apiUrl}/instituicao`;

  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  cadastrarInstituicao(instituicao: Instituicao): Observable<Instituicao> {
    return this.http
      .post<Instituicao>(this.apiUrl, instituicao, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 0:   errorMessage = 'Falha de conexão. Verifique sua rede.'; break;
        case 400: errorMessage = 'Dados inválidos. Revise o formulário.'; break;
        case 403: errorMessage = 'Acesso negado.'; break;
        case 404: errorMessage = 'Endpoint não encontrado.'; break;
        case 500: errorMessage = 'Erro no servidor. Tente mais tarde.'; break;
        default:  errorMessage = `Erro ${error.status}: ${error.message}`;
      }
    }
    console.error('[CadastroInstituicaoService]', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
