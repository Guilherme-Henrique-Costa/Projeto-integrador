import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificadosComponent } from './certificados.component';
import { CertificadosRoutingModule } from './certificados-routing.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [CertificadosComponent],
  imports: [
    CommonModule,
    CertificadosRoutingModule,
    ButtonModule
  ]
})
export class CertificadosModule { }
