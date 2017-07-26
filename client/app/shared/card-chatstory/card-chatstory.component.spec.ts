import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardChatstoryComponent } from './card-chatstory.component';

describe('CardChatstoryComponent', () => {
  let component: CardChatstoryComponent;
  let fixture: ComponentFixture<CardChatstoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardChatstoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardChatstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
