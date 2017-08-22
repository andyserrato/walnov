import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountPreferencesComponent } from './user-account-preferences.component';

describe('UserAccountPreferencesComponent', () => {
  let component: UserAccountPreferencesComponent;
  let fixture: ComponentFixture<UserAccountPreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountPreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
