import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFollowUserComponent } from './card-follow-user.component';

describe('CardFollowUserComponent', () => {
  let component: CardFollowUserComponent;
  let fixture: ComponentFixture<CardFollowUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFollowUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFollowUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
