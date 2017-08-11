import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserContentHistoriasComponent } from './user-content-historias.component';

describe('UserContentHistoriasComponent', () => {
  let component: UserContentHistoriasComponent;
  let fixture: ComponentFixture<UserContentHistoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserContentHistoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserContentHistoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
