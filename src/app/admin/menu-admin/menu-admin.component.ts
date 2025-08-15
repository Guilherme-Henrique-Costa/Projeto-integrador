import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemMenu, MenuAdminService } from './menu-admin.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {
  itens: ItemMenu[] = [];
  nome = 'Administrador';
  hoje = Date.now();


  constructor(
    private readonly menuService: MenuAdminService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    if (!this.menuService.isLogado()) {
      this.router.navigate(['/login-admin']);
      return;
    }
    this.nome = this.menuService.getNomeAdmin();
    this.itens = this.menuService.getItens();
  }

  navegar(rota: string) {
    this.router.navigate([rota]);
  }

  sair() {
    this.menuService.sair();
    this.router.navigate(['/login-admin']);
  }

  get saudacao(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Bom dia';
    if (h < 18) return 'Boa tarde';
    return 'Boa noite';
  }
}
