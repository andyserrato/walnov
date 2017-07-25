import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMiBibliotecaBuscadorComponent } from './card-mi-biblioteca-buscador.component';

describe('CardMiBibliotecaBuscadorComponent', () => {
  let component: CardMiBibliotecaBuscadorComponent;
  let fixture: ComponentFixture<CardMiBibliotecaBuscadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardMiBibliotecaBuscadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMiBibliotecaBuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
