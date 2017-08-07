import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserContentChatstoriesComponent } from './user-content-chatstories.component';

describe('UserContentChatstoriesComponent', () => {
  let component: UserContentChatstoriesComponent;
  let fixture: ComponentFixture<UserContentChatstoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserContentChatstoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserContentChatstoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
