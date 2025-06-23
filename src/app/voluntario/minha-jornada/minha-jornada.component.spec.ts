import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhaJornadaComponent } from './minha-jornada.component';

describe('MinhaJornadaComponent', () => {
  let component: MinhaJornadaComponent;
  let fixture: ComponentFixture<MinhaJornadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinhaJornadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinhaJornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
