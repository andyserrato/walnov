import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoUserComponent } from './nuevo-user.component';

describe('NuevoUserComponent', () => {
  let component: NuevoUserComponent;
  let fixture: ComponentFixture<NuevoUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
