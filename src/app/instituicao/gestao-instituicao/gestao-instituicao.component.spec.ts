import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoInstituicaoComponent } from './gestao-instituicao.component';

describe('GestaoInstituicaoComponent', () => {
  let component: GestaoInstituicaoComponent;
  let fixture: ComponentFixture<GestaoInstituicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoInstituicaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoInstituicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
