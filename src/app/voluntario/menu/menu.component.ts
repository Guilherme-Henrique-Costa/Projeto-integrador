import { Component, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @ViewChild('sidebarRef', { static: false }) sidebarRef!: Sidebar;
  sidebarVisible: boolean = false;

  constructor() {}

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

}
