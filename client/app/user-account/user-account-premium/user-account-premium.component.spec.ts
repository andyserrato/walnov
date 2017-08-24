import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountPremiumComponent } from './user-account-premium.component';

describe('UserAccountPremiumComponent', () => {
  let component: UserAccountPremiumComponent;
  let fixture: ComponentFixture<UserAccountPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountPremiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
