import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackInstituicaoComponent } from './feedback-instituicao.component';

describe('FeedbackInstituicaoComponent', () => {
  let component: FeedbackInstituicaoComponent;
  let fixture: ComponentFixture<FeedbackInstituicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackInstituicaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackInstituicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
