import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosInstituicaoComponent } from './relatorios-instituicao.component';

describe('RelatoriosInstituicaoComponent', () => {
  let component: RelatoriosInstituicaoComponent;
  let fixture: ComponentFixture<RelatoriosInstituicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatoriosInstituicaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatoriosInstituicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
