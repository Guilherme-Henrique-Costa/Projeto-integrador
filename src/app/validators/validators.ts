import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class Validators {
  /**
   * Validador para Competência.
   * Deve conter apenas letras, números, vírgulas, pontos e espaços.
   */
  static competenciaValida(control: AbstractControl): ValidationErrors | null {
    const competencia = control.value;
    if (!competencia) return null;

    // Valida o formato (letras, números, vírgulas, pontos e espaços)
    if (!/^[a-zA-ZÀ-ÿ0-9,. ]*$/.test(competencia)) {
      return { competenciaInvalida: true };
    }

    return null;
  }

  /**
   * Validador para Matrícula.
   * Deve conter exatamente 8 números.
   */
  static matricula(control: AbstractControl): ValidationErrors | null {
    const matricula = control.value;
    if (!matricula) return null;

    // Valida se contém exatamente 8 números
    if (!/^\d{8}$/.test(matricula)) {
      return { matriculaInvalida: true };
    }

    return null;
  }

  /**
   * Validador para Nome Completo.
   * Permite apenas letras e espaços, com mínimo de 3 caracteres.
   */
  static nomeCompleto(control: AbstractControl): ValidationErrors | null {
    const nome = control.value;
    if (!nome || /^[a-zA-ZÀ-ÿ ]{3,}$/.test(nome)) {
      return null;
    }
    return { nomeInvalido: true };
  }

  /**
   * Validador de CPF.
   * Lógica completa para validar CPF conforme regras oficiais.
   */
  static cpf(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value;
    if (!cpf) return null;

    // Remover caracteres não numéricos
    const cpfCleaned = cpf.replace(/\D/g, '');

    // Verificar tamanho
    if (cpfCleaned.length !== 11) {
      return { cpfInvalido: true };
    }

    // Invalidar CPFs com dígitos repetidos (e.g., 111.111.111-11)
    if (/^(\d)\1+$/.test(cpfCleaned)) {
      return { cpfInvalido: true };
    }

    // Validar dígitos verificadores
    const validateDigit = (base: string, factor: number): number => {
      let total = 0;
      for (let i = 0; i < base.length; i++) {
        total += parseInt(base.charAt(i)) * (factor - i);
      }
      const remainder = total % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const base = cpfCleaned.slice(0, 9);
    const digit1 = validateDigit(base, 10);
    const digit2 = validateDigit(base + digit1, 11);

    if (digit1 !== parseInt(cpfCleaned.charAt(9)) || digit2 !== parseInt(cpfCleaned.charAt(10))) {
      return { cpfInvalido: true };
    }

    return null;
  }

  /**
   * Validador de e-mails com provedores restritos.
   * Exemplo: gmail.com, hotmail.com, yahoo.com.
   */
  static emailProvedor(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (!email) return null;

    const dominiosValidos = ['gmail.com', 'googlemail.com', 'hotmail.com', 'outlook.com',
      'live.com', 'yahoo.com', 'ymail.com', 'icloud.com', 'mac.com',
      'me.com', 'aol.com', 'protonmail.com', 'zoho.com', 'mail.com', 'gmx.com', 'sempreceub.com'];
    const dominio = email.split('@')[1];
    if (!dominiosValidos.includes(dominio)) {
      return { dominioInvalido: true };
    }

    return null;
  }

  /**
   * Validador de força da senha.
   * Exige pelo menos 6 caracteres com letras maiúsculas, minúsculas, números e caracteres especiais.
   */
  static forcaSenha(control: AbstractControl): ValidationErrors | null {
    const senha = control.value;
    if (!senha) return null;

    const regexForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!regexForte.test(senha)) {
      return { senhaFraca: true };
    }

    return null;
  }

  /**
   * Validador para celular.
   * Aceita números com 10 ou 11 dígitos.
   */
  static celular(control: AbstractControl): ValidationErrors | null {
    const celular = control.value;
    if (!celular) return null;

    // Permitir apenas números e verificar comprimento
    const celularCleaned = celular.replace(/\D/g, '');
    if (!/^\d{10,11}$/.test(celularCleaned)) {
      return { celularInvalido: true };
    }

    return null;
  }

  /**
   * Validador para endereço.
   * Permite letras, números, vírgulas e espaços, com tamanho mínimo de 5 caracteres.
   */
  static endereco(control: AbstractControl): ValidationErrors | null {
    const endereco = control.value;
    if (!endereco || /^[a-zA-ZÀ-ÿ0-9, ]{5,}$/.test(endereco)) {
      return null;
    }
    return { enderecoInvalido: true };
  }

  /**
   * Validador para bairro.
   * Permite apenas letras e espaços, com tamanho mínimo de 3 caracteres.
   */
  static bairro(control: AbstractControl): ValidationErrors | null {
    const bairro = control.value;
    if (!bairro || /^[a-zA-ZÀ-ÿ ]{3,}$/.test(bairro)) {
      return null;
    }
    return { bairroInvalido: true };
  }

  /**
   * Validador para local.
   * Permite letras, números, vírgulas e espaços, com tamanho mínimo de 3 caracteres.
   */
  static local(control: AbstractControl): ValidationErrors | null {
    const local = control.value;
    if (!local || /^[a-zA-ZÀ-ÿ0-9, ]{3,}$/.test(local)) {
      return null;
    }
    return { localInvalido: true };
  }

  /**
   * Validador para competência.
   * Permite letras, números, vírgulas, pontos e espaços, com mínimo de 2 caracteres.
   */
  static competencia(control: AbstractControl): ValidationErrors | null {
    const competencia = control.value;
    if (!competencia || /^[a-zA-ZÀ-ÿ0-9,. ]{2,}$/.test(competencia)) {
      return null;
    }
    return { competenciaInvalida: true };
  }

  /**
   * Validador de idade mínima.
   * Aceita uma idade mínima como parâmetro.
   */
  static idadeMinima(idadeMinima: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dataNascimento = control.value;
      if (!dataNascimento) return null;

      const hoje = new Date();
      const nascimento = new Date(dataNascimento);
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const mesAtual = hoje.getMonth();
      const diaAtual = hoje.getDate();
      const mesNascimento = nascimento.getMonth();
      const diaNascimento = nascimento.getDate();

      if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
        idade--;
      }

      return idade >= idadeMinima ? null : { idadeMinima: { requiredAge: idadeMinima, currentAge: idade } };
    };
  }

  // Validador para Período Início e Período Fim
  static periodoValido(campoInicio: string, campoFim: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const inicio = group.get(campoInicio)?.value;
      const fim = group.get(campoFim)?.value;

      if (!inicio || !fim) return null;

      const dataInicio = new Date(inicio);
      const dataFim = new Date(fim);

      if (dataFim <= dataInicio) {
        return { periodoInvalido: true };
      }

      return null;
    };
  }
}
