import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBuscadorContenidoComponent } from './card-buscador-contenido.component';

describe('CardBuscadorContenidoComponent', () => {
  let component: CardBuscadorContenidoComponent;
  let fixture: ComponentFixture<CardBuscadorContenidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardBuscadorContenidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBuscadorContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
