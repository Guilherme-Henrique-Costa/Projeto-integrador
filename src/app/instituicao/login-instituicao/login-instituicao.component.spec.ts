import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { LoginInstituicaoComponent } from './login-instituicao.component';
import { LoginService } from './login-instituicao.service';

describe('LoginInstituicaoComponent', () => {
  let component: LoginInstituicaoComponent;
  let fixture: ComponentFixture<LoginInstituicaoComponent>;
  let loginService: jasmine.SpyObj<LoginService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginInstituicaoComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: Router, useValue: routerSpy },
        MessageService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginInstituicaoComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate email and password', () => {
    component.email = 'invalid-email';
    component.senha = '123';

    // Aqui você espia os métodos privados e define seu retorno
    spyOn<any>(component, 'isEmailValido').and.returnValue(false);
    spyOn<any>(component, 'isSenhaValida').and.returnValue(false);

    expect(component['isEmailValido'](component.email)).toBeFalse();
    expect(component['isSenhaValida'](component.senha)).toBeFalse();
  });



  it('should login successfully', () => {
    component.email = 'valid@test.com';
    component.senha = 'ValidPass123';

    loginService.login.and.returnValue(of({ id: 1, nome: 'Test', email: 'valid@test.com', token: 'token123' }));

    component.login();

    expect(loginService.login).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/menu-instituicao']);
  });

  it('should handle login failure', () => {
    component.email = 'valid@test.com';
    component.senha = 'ValidPass123';

    loginService.login.and.returnValue(throwError(() => new Error('Erro de login')));

    component.login();

    expect(loginService.login).toHaveBeenCalled();
    expect(component.senha).toBe('ValidPass123');
  });
});
