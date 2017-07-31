import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHomeNavigateComponent } from './card-home-navigate.component';

describe('CardHomeNavigateComponent', () => {
  let component: CardHomeNavigateComponent;
  let fixture: ComponentFixture<CardHomeNavigateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardHomeNavigateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHomeNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
