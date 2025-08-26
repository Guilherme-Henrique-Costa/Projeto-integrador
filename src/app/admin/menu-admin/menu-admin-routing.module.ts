import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuAdminComponent } from './menu-admin.component';

const routes: Routes = [
  {path: '', component: MenuAdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuAdminRoutingModule { }
