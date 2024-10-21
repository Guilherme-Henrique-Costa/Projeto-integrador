import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuInstituicaoService {
  private instituicaoNome: string = "Instituicção"; // Nome padrão, será substituído após o login

  constructor() { }

   // Função para definir o nome do voluntário
   setInstituicaoNome(nome: string): void {
    this.instituicaoNome = nome;
   }

   // Função para retornar o nome da instituição
   getInstituicaoNome(): string {
    return this.instituicaoNome;
   }
}
