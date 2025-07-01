import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PerfilInstituicao, PerfilInstituicaoService } from './perfil-instituicao.service';

@Component({
  selector: 'app-perfil-instituicao',
  templateUrl: './perfil-instituicao.component.html',
  styleUrls: ['./perfil-instituicao.component.css']
})
export class PerfilInstituicaoComponent {
  searchQuery: string = '';
  sidebarOpen: boolean = true;
  cadastroForm: FormGroup;

  instituicaoNome: string = 'Instituição'; // Nome padrão, será substituído após o login

  sidebarItems = [
    { label: 'Menu', icon: 'pi pi-compass', route: '/menu-instituicao'},
    { label: 'Perfil', icon: 'pi pi-user', route: '/perfil-instituicao' },
    { label: 'Vagas', icon: 'pi pi-bookmark', route: '/vagas-instituicao' },
    { label: 'Candidatos', icon: 'pi pi-user', route: '/candidatos' },
    { label: 'Feedback', icon: 'pi pi-inbox', route: '/feedback-instituicao'},
    { label: 'Gestão', icon: 'pi pi-chart-line', route: '/gestao' },
    { label: 'Mensagens', icon: 'pi pi-comments', route: '/mensagem-instituicao' },
    { label: 'Ranking', icon: 'pi pi-star-fill', route: '/ranking-instituicao' },
    { label: 'Sair', icon: 'pi pi-sign-out', route: '/login-instituicao' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private perfilInstituicaoService: PerfilInstituicaoService
  ) {
    this.cadastroForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
      cnpj: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(16)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  ngOnInit(): void {
    const nomeSalvo = localStorage.getItem('userName');
    const emailSalvo = localStorage.getItem('userEmail');

    if (nomeSalvo) {
      this.instituicaoNome = nomeSalvo;
    }

    if (emailSalvo) {
      this.perfilInstituicaoService.findByEmail(emailSalvo).subscribe({
        next: (instituicao) => {
          this.cadastroForm.patchValue({
            id: instituicao.id,
            name: instituicao.nome,
            email: instituicao.email,
            cnpj: instituicao.cnpj.toString(),
            password: instituicao.password
          });
        },
        error: (err) => {
          console.error('Erro ao carregar dados da instituição:', err);
        }
      });
    }
  }

  salvar(): void {
    if (this.cadastroForm.valid) {
      const perfilInstituicao: PerfilInstituicao = this.cadastroForm.value;

      if (perfilInstituicao.id) {
        this.perfilInstituicaoService.update(perfilInstituicao.id, perfilInstituicao).subscribe({
          next: (res) => {
            console.log('Perfil atualizado com sucesso:', res);
            this.router.navigate(['/menu-instituicao']);
          },
          error: (err) => {
            console.error('Erro ao atualizar perfil:', err);
          }
        });
      } else {
        this.perfilInstituicaoService.create(perfilInstituicao).subscribe({
          next: (res) => {
            console.log('Perfil criado com sucesso:', res);
            this.router.navigate(['/menu-instituicao']);
          },
          error: (err) => {
            console.error('Erro ao criar perfil:', err);
          }
        });
      }
    } else {
      this.cadastroForm.markAllAsTouched();
      console.error('Formulário inválido');
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  getErrorMessage(field: string): string {
    const control = this.cadastroForm.get(field);
    if (control?.hasError('required')) return `${this.getFieldLabel(field)} é obrigatório.`;
    if (control?.hasError('minlength')) return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres.`;
    if (control?.hasError('maxlength')) return `Máximo ${control.errors?.['maxlength'].requiredLength} caracteres.`;
    if (control?.hasError('email')) return `E-mail deve conter '@'.`;
    return '';
  }

  private getFieldLabel(field: string): string {
    const labels: { [key: string]: string } = {
      name: 'Nome',
      email: 'E-mail',
      cnpj: 'CNPJ',
      password: 'Senha'
    };
    return labels[field] || field.charAt(0).toUpperCase() + field.slice(1);
  }
}
