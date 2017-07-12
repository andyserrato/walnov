import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUsuarioTendenciaComponent } from './card-usuario-tendencia.component';

describe('CardUsuarioTendenciaComponent', () => {
  let component: CardUsuarioTendenciaComponent;
  let fixture: ComponentFixture<CardUsuarioTendenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardUsuarioTendenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardUsuarioTendenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
