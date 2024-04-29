import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-cadastro-componente',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  items: MenuItem[] | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.cadastroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      interestArea: [''], // Validações adicionais podem ser aplicadas
      competence: [''] // Validações adicionais podem ser aplicadas
    });
  }
  ngOnInit() {
    this.items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        }
    ];
}

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      console.log(this.cadastroForm.value);
      // Aqui você pode inserir a lógica de submissão, como enviar para uma API.
    } else {
      // Você pode lidar com a validação de formulário aqui
      console.error('Formulário inválido');
    }
  }
  voltar() {
    this.router.navigate(['/login']);
  }
}
