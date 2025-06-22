import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatVoluntarioComponent } from './chat-voluntario.component';

describe('ChatVoluntarioComponent', () => {
  let component: ChatVoluntarioComponent;
  let fixture: ComponentFixture<ChatVoluntarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatVoluntarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
