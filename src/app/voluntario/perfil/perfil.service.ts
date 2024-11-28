import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private baseUrl = 'https://sua-api.com/api/perfil'; // Substituir

  constructor(private http: HttpClient) {}

  // Método para obter o perfil do voluntário
  getPerfilVoluntario(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/voluntario`);
  }

  // Método para atualizar o perfil do voluntário
  updatePerfilVoluntario(perfil: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/voluntario`, perfil);
  }
}
