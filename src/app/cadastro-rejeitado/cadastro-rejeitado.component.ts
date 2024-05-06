import { frases, label } from './../../assets/dicionario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Text } from 'src/assets/dicionario';

@Component({
  selector: 'app-cadastro-rejeitado',
  templateUrl: './cadastro-rejeitado.component.html',
  styleUrls: ['./cadastro-rejeitado.component.css'],
})
export class CadastroRejeitadoComponent implements OnInit {
  // texto = Text;
  // frasesAleatorias = frases;
  // label = label;

  constructor(private router: Router) {}

  ngOnInit(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

}
