import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecienteNotificacionComponent } from './reciente-notificacion.component';

describe('RecienteNotificacionComponent', () => {
  let component: RecienteNotificacionComponent;
  let fixture: ComponentFixture<RecienteNotificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecienteNotificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecienteNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
