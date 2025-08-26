import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoluntariosAdminComponent } from './voluntarios-admin.component';

const routes: Routes = [
  {
    path: 'voluntarios-admin', component: VoluntariosAdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoluntariosAdminRoutingModule {}
