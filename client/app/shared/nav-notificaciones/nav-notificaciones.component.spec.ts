import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavNotificacionesComponent } from './nav-notificaciones.component';

describe('NavNotificacionesComponent', () => {
  let component: NavNotificacionesComponent;
  let fixture: ComponentFixture<NavNotificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavNotificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
