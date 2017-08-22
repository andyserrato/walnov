import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUserAccountNavigateComponent } from './card-user-account-navigate.component';

describe('CardUserAccountNavigateComponent', () => {
  let component: CardUserAccountNavigateComponent;
  let fixture: ComponentFixture<CardUserAccountNavigateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardUserAccountNavigateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardUserAccountNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
