import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CadastroInstituicaoComponent } from './cadastro-instituicao.component';
import { CadastroInstituicaoService, PerfilInstituicao } from './cadastro-instituicao.service';

describe('CadastroInstituicaoComponent', () => {
  let component: CadastroInstituicaoComponent;
  let fixture: ComponentFixture<CadastroInstituicaoComponent>;
  let cadastroService: jasmine.SpyObj<CadastroInstituicaoService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const cadastroServiceSpy = jasmine.createSpyObj('CadastroInstituicaoService', ['cadastrarPerfilInstituicao']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CadastroInstituicaoComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: CadastroInstituicaoService, useValue: cadastroServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroInstituicaoComponent);
    component = fixture.componentInstance;
    cadastroService = TestBed.inject(CadastroInstituicaoService) as jasmine.SpyObj<CadastroInstituicaoService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form controls', () => {
    const form = component.cadastroForm;

    form.controls['name'].setValue('');
    expect(form.controls['name'].valid).toBeFalsy();

    form.controls['email'].setValue('invalid');
    expect(form.controls['email'].valid).toBeFalsy();
  });

  it('should submit valid form and navigate', () => {
    const validForm: PerfilInstituicao = {
      name: 'Instituicao Teste',
      email: 'teste@instituicao.com',
      password: 'SenhaForte123!',
      interestArea: 'Educação e Ensino',
      competence: 'Ensino Básico',
      description: 'Uma breve descrição',
      cnpj: ''
    };

    component.cadastroForm.setValue(validForm);
    cadastroService.cadastrarPerfilInstituicao.and.returnValue(of(validForm));

    component.onSubmit();

    expect(cadastroService.cadastrarPerfilInstituicao).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/menu-instituicao']);
  });

  it('should handle form submission failure', () => {
    const invalidForm = {
      name: 'Instituicao',
      email: 'invalid',
      password: '123',
      interestArea: '',
      description: ''
    };

    component.cadastroForm.setValue(invalidForm);
    cadastroService.cadastrarPerfilInstituicao.and.returnValue(throwError(() => new Error('Erro ao cadastrar')));

    component.onSubmit();

    expect(cadastroService.cadastrarPerfilInstituicao).toHaveBeenCalled();
    expect(component.cadastroForm.valid).toBeFalse();
  });
});
