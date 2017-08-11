import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContinuacionComponent } from './card-continuacion.component';

describe('CardContinuacionComponent', () => {
  let component: CardContinuacionComponent;
  let fixture: ComponentFixture<CardContinuacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardContinuacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardContinuacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
