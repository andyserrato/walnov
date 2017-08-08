import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserContentRelatosComponent } from './user-content-relatos.component';

describe('UserContentRelatosComponent', () => {
  let component: UserContentRelatosComponent;
  let fixture: ComponentFixture<UserContentRelatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserContentRelatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserContentRelatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
