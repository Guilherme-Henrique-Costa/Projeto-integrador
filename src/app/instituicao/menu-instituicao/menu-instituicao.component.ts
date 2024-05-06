import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-menu-instituicao',
  templateUrl: './menu-instituicao.component.html',
  styleUrls: ['./menu-instituicao.component.css'],

})
export class MenuInstituicaoComponent {
  @ViewChild('sidebarRef', { static: false }) sidebarRef!: Sidebar;
  sidebarVisible: boolean = false;

  constructor() {}

  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }


}
