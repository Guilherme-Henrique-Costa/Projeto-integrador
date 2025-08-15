import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { label } from 'src/assets/dicionario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  label = label;


  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  instituicao() {
    this.router.navigate(['/login-instituicao']);
  }

  admin() {
    this.router.navigate(['/login-admin']);
  }

}
