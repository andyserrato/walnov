import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserContentContinuacionesComponent } from './user-content-continuaciones.component';

describe('UserContentContinuacionesComponent', () => {
  let component: UserContentContinuacionesComponent;
  let fixture: ComponentFixture<UserContentContinuacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserContentContinuacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserContentContinuacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
