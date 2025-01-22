import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingInstituicaoComponent } from './ranking-instituicao.component';

describe('RankingInstituicaoComponent', () => {
  let component: RankingInstituicaoComponent;
  let fixture: ComponentFixture<RankingInstituicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingInstituicaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingInstituicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
