import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardActividadRecienteComponent } from './card-actividad-reciente.component';

describe('CardActividadRecienteComponent', () => {
  let component: CardActividadRecienteComponent;
  let fixture: ComponentFixture<CardActividadRecienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardActividadRecienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardActividadRecienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
