import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { SharedModule } from 'primeng/api';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ToolbarModule,
    AvatarModule,
    SharedModule
  ]
})
export class MenuModule { }
