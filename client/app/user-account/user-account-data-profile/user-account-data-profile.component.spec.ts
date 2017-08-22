import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountDataProfileComponent } from './user-account-data-profile.component';

describe('UserAccountDataProfileComponent', () => {
  let component: UserAccountDataProfileComponent;
  let fixture: ComponentFixture<UserAccountDataProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountDataProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountDataProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
