import { AbstractControl, ValidationErrors, Validators as AngularValidators } from '@angular/forms';

export class InstituicaoValidators {
  static nome(control: AbstractControl): ValidationErrors | null {
    const nome = control.value;
    if (!nome || /^[a-zA-ZÀ-ÿ\s]{4,64}$/.test(nome)) {
      return null;
    }
    return { nomeInvalido: true };
  }

  static cnpj(control: AbstractControl): ValidationErrors | null {
    const cnpj = control.value;
    if (!cnpj) return null;

    // Validação básica para 14 dígitos
    if (!/^\d{14}$/.test(cnpj)) {
      return { cnpjInvalido: true };
    }

    return null;
  }

  static email(control: AbstractControl): ValidationErrors | null {
    return AngularValidators.email(control);
  }

  static senha(control: AbstractControl): ValidationErrors | null {
    const senha = control.value;
    if (!senha) return null;

    const regexForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,50}$/;

    if (!regexForte.test(senha)) {
      return { senhaFraca: true };
    }

    return null;
  }

  static endereco(control: AbstractControl): ValidationErrors | null {
    const endereco = control.value;
    if (!endereco || /^[a-zA-ZÀ-ÿ0-9\s,]{4,128}$/.test(endereco)) {
      return null;
    }
    return { enderecoInvalido: true };
  }

  static areaAtuacao(control: AbstractControl): ValidationErrors | null {
    const area = control.value;
    if (!area || area.length > 0) {
      return null;
    }
    return { areaAtuacaoInvalida: true };
  }

  static descricao(control: AbstractControl): ValidationErrors | null {
    const descricao = control.value;
    if (!descricao || descricao.length <= 240) {
      return null;
    }
    return { descricaoInvalida: true };
  }

  static nomeResponsavel(control: AbstractControl): ValidationErrors | null {
    const nome = control.value;
    if (!nome || /^[a-zA-ZÀ-ÿ\s]{4,64}$/.test(nome)) {
      return null;
    }
    return { nomeInvalido: true };
  }

  static cpfResponsavel(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value;
    if (!cpf) return null;

    // Remover caracteres não numéricos
    const cpfCleaned = cpf.replace(/\D/g, '');

    if (cpfCleaned.length !== 11) {
      return { cpfInvalido: true };
    }

    // Verifica sequência de números repetidos
    if (/^(\d)\1+$/.test(cpfCleaned)) {
      return { cpfInvalido: true };
    }

    return null;
  }
}
