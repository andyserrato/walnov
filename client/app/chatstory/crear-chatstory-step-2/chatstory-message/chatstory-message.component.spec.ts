import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatstoryMessageComponent } from './chatstory-message.component';

describe('ChatstoryMessageComponent', () => {
  let component: ChatstoryMessageComponent;
  let fixture: ComponentFixture<ChatstoryMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatstoryMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatstoryMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
