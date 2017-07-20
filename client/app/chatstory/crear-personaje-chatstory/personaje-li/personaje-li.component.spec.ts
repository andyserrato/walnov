import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonajeLiComponent } from './personaje-li.component';

describe('PersonajeLiComponent', () => {
  let component: PersonajeLiComponent;
  let fixture: ComponentFixture<PersonajeLiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonajeLiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonajeLiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
