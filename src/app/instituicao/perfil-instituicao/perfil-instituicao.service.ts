import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Instituicao {
  id: number;
  nome: string;
  cnpj: string;
  email: string;
  senha?: string;
}

export interface PerfilInstituicao {
  id?: number;
  cnpj: string;
  email: string;
  password: string;
  nome: string;
  logoUrl?: string;
  telefone?: string;
  whatsapp?: string;
  site?: string;
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
}

interface PerfilBE {
  id?: number;
  logoUrl?: string;
  telefone?: string;
  whatsapp?: string;
  site?: string;
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
}

interface ViaCepResponse {
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean;
}

@Injectable({ providedIn: 'root' })
export class PerfilInstituicaoService {
  private readonly basePerfil = `${environment.apiUrl}/perfil-instituicao`;
  private readonly baseInst = `${environment.apiUrl}/instituicao`;
  private readonly json = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) {}

  findByEmail(email: string): Observable<PerfilInstituicao> {
    const params = new HttpParams().set('email', email);
    return this.http.get<Instituicao>(`${this.baseInst}/email`, { params }).pipe(
      switchMap((inst) => this.getPerfilByInstituicaoId(inst.id).pipe(map((perfil) => this.merge(inst, perfil)))),
      catchError(this.handle),
    );
  }

  findByInstituicaoId(id: number): Observable<PerfilInstituicao> {
    return forkJoin({
      inst: this.http.get<Instituicao>(`${this.baseInst}/${id}`),
      perfil: this.getPerfilByInstituicaoId(id),
    }).pipe(map(({ inst, perfil }) => this.merge(inst, perfil)), catchError(this.handle));
  }

  updateInstituicao(id: number, payload: Partial<Instituicao> & { password?: string }): Observable<Instituicao> {
    const body: any = { ...payload };
    if (body.password) {
      body.senha = body.password;
      delete body.password;
    } else {
      delete body.senha;
    }
    return this.http.put<Instituicao>(`${this.baseInst}/${id}`, body, this.json).pipe(catchError(this.handle));
  }

  upsertPerfilByInstituicaoId(instId: number, perfil: PerfilBE): Observable<PerfilBE> {
    return this.http.post<PerfilBE>(`${this.basePerfil}/instituicao/${instId}`, perfil, this.json).pipe(catchError(this.handle));
  }

  buscarCep(cep: string): Observable<Pick<PerfilInstituicao, 'endereco' | 'bairro' | 'cidade' | 'uf'>> {
    const digits = String(cep || '').replace(/\D/g, '');
    return this.http.get<ViaCepResponse>(`https://viacep.com.br/ws/${digits}/json/`).pipe(
      map((res) => {
        if (res?.erro) throw new Error('CEP não encontrado.');
        return { endereco: res.logradouro || '', bairro: res.bairro || '', cidade: res.localidade || '', uf: res.uf || '' };
      }),
      catchError(this.handle),
    );
  }

  private getPerfilByInstituicaoId(instId: number): Observable<PerfilBE | null> {
    return this.http.get<any>(`${this.basePerfil}/instituicao/${instId}`).pipe(
      map((resp) => {
        if (resp == null) return null;
        if (typeof resp === 'object' && 'value' in resp) return (resp.value ?? null) as PerfilBE | null;
        return resp as PerfilBE;
      }),
      catchError(() => of(null)),
    );
  }

  private merge(inst: Instituicao, perfil: PerfilBE | null): PerfilInstituicao {
    return {
      id: inst.id,
      nome: inst.nome ?? '',
      email: inst.email ?? '',
      cnpj: String(inst.cnpj ?? ''),
      password: '',
      logoUrl: perfil?.logoUrl ?? '',
      telefone: perfil?.telefone ?? '',
      whatsapp: perfil?.whatsapp ?? '',
      site: perfil?.site ?? '',
      cep: perfil?.cep ?? '',
      endereco: perfil?.endereco ?? '',
      numero: perfil?.numero ?? '',
      complemento: perfil?.complemento ?? '',
      bairro: perfil?.bairro ?? '',
      cidade: perfil?.cidade ?? '',
      uf: perfil?.uf ?? '',
    };
  }

  private handle(error: HttpErrorResponse): Observable<never> {
    const apiMsg = (error.error && (error.error.message || error.error.error)) || '';
    const msg = error.status
      ? `Erro ${error.status}${error.statusText ? ` - ${error.statusText}` : ''}${apiMsg ? `: ${apiMsg}` : ''}`
      : error.error?.message || error.message || 'Erro desconhecido';
    return throwError(() => new Error(msg));
  }
}
