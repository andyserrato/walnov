import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountInteresesComponent } from './user-account-intereses.component';

describe('UserAccountInteresesComponent', () => {
  let component: UserAccountInteresesComponent;
  let fixture: ComponentFixture<UserAccountInteresesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountInteresesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountInteresesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
