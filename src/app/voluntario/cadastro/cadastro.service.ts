import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private apiUrl = 'http://localhost:8080/api/cadastro-voluntarios'; // Certifique-se de que está correto

  constructor(private http: HttpClient) { }

  cadastrarVoluntario(voluntario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, voluntario);
  }

  verificarCpf(cpf: string): Observable<boolean> {
    return this.http.get<{ existe: boolean }>(`${this.apiUrl}/verificar-cpf/${cpf}`).pipe(
      map(response => response.existe)
    );
  }

}
