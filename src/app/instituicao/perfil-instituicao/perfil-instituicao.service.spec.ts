import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PerfilInstituicaoComponent } from './perfil-instituicao.component';

describe('PerfilInstituicaoComponent', () => {
  let component: PerfilInstituicaoComponent;
  let fixture: ComponentFixture<PerfilInstituicaoComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [PerfilInstituicaoComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilInstituicaoComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar', () => {
    expect(component.sidebarOpen).toBeTrue();
    component.toggleSidebar();
    expect(component.sidebarOpen).toBeFalse();
  });

  it('should validate form inputs', () => {
    const form = component.cadastroForm;

    form.controls['name'].setValue('Valid Name');
    expect(form.controls['name'].valid).toBeTrue();

    form.controls['cnpj'].setValue('12345678901234');
    expect(form.controls['cnpj'].valid).toBeTrue();
  });

  it('should create form with confirmPassword field', () => {
    expect(component.cadastroForm.contains('confirmPassword')).toBeTrue();
  });


  it('should handle form submission', () => {
    component.cadastroForm.setValue({
      name: 'Valid Name',
      email: 'valid@test.com',
      cnpj: '12345678901234',
      password: 'ValidPass123',
      interestArea: 'Saúde',
      competence: 'Competência',
      description: 'Descrição válida'
    });

    component.onSubmit();
    expect(component.cadastroForm.valid).toBeTrue();
  });
});
