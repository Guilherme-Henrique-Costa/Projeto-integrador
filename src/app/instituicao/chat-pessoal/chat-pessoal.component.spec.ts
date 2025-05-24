import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPessoalComponent } from './chat-pessoal.component';

describe('ChatPessoalComponent', () => {
  let component: ChatPessoalComponent;
  let fixture: ComponentFixture<ChatPessoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatPessoalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatPessoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
