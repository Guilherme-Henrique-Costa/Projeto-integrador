import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroRejeitadoComponent } from './cadastro-rejeitado.component';

describe('CadastroRejeitadoComponent', () => {
  let component: CadastroRejeitadoComponent;
  let fixture: ComponentFixture<CadastroRejeitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroRejeitadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroRejeitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
