import { Component, OnInit } from '@angular/core';
import { Text, placeholder, label, frases } from 'src/assets/dicionario';

@Component({
  selector: 'app-politica-privacidade',
  templateUrl: './politica-privacidade.component.html',
  styleUrls: ['./politica-privacidade.component.css']
})
export class PoliticaPrivacidadeComponent implements OnInit {

  label = label;
  texto = Text;
  frasesAleatorias = frases;

  constructor() { }

  ngOnInit(): void {
  }

}
