// menu.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private voluntarioNome: string = 'Aluno'; // Nome padrão, será substituído após o login

  constructor() {}

  // Função para definir o nome do voluntário
  setVoluntarioNome(nome: string): void {
    this.voluntarioNome = nome;
  }

  // Função para retornar o nome do voluntário
  getVoluntarioNome(): string {
    return this.voluntarioNome;
  }
}
