import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from './login-instituicao.service';
import { frases, label, placeholder, Text } from 'src/assets/dicionario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-instituicao',
  templateUrl: './login-instituicao.component.html',
  styleUrls: ['./login-instituicao.component.css'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginInstituicaoComponent {
  // dialog LGPD
  position = 'center';
  displayPosition = true;

  // dicionário
  text = Text;
  placeholder = placeholder;
  frasesAleatorias = frases;
  label = label;

  // reactive form
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly loginService: LoginService,
  ) {}

  // submit do formulário
  onSubmit(): void {
    if (this.form.invalid) {
      this.exibirMensagemErro(this.getMensagemErro());
      return;
    }

    const payload = this.form.getRawValue(); // { email, senha }
    this.loginService.login(payload).subscribe({
      next: () => {
        this.exibirMensagemSucesso('Login realizado com sucesso.');
        this.redirecionarPara('/menu-instituicao', 500);
      },
      error: (err: Error) => {
        const mensagem =
          err.message?.includes('401') || err.message?.toLowerCase().includes('não autorizado')
            ? 'Credenciais inválidas. Verifique o e-mail e a senha.'
            : err.message || 'Erro ao realizar login. Tente novamente mais tarde.';
        this.exibirMensagemErro(mensagem);
      },
    });
  }

  // helpers de validação/mensagens
  private getMensagemErro(): string {
    const email = this.form.get('email');
    const senha = this.form.get('senha');

    if (email?.hasError('required')) return 'O e-mail é obrigatório.';
    if (email?.hasError('email')) return 'O e-mail inserido é inválido.';
    if (senha?.hasError('required')) return 'A senha é obrigatória.';
    if (senha?.hasError('minlength')) return 'A senha precisa ter no mínimo 3 caracteres.';
    return 'Verifique os campos e tente novamente.';
  }

  private exibirMensagemSucesso(mensagem: string): void {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: mensagem });
  }
  private exibirMensagemErro(mensagem: string): void {
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: mensagem });
  }

  private redirecionarPara(rota: string, delay = 0): void {
    setTimeout(() => this.router.navigate([rota]), delay);
  }

  // ações de navegação
  cadastrarInstituicao(): void {
    this.redirecionarPara('/cadastro-instituicao');
  }
  voltar(): void {
    this.redirecionarPara('/home');
  }
  redefinirSenha(): void {
    this.redirecionarPara('/confirmar-senha-instituicao');
  }

  // LGPD dialog
  aceitar(): void {
    this.displayPosition = false;
  }
  rejeitar(): void {
    this.displayPosition = false;
    this.redirecionarPara('/cadastro-rejeitado');
  }
}
