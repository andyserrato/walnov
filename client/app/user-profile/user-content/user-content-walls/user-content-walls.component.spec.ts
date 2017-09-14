import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserContentWallsComponent } from './user-content-walls.component';

describe('UserContentWallsComponent', () => {
  let component: UserContentWallsComponent;
  let fixture: ComponentFixture<UserContentWallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserContentWallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserContentWallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
