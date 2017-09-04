import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBuscadorPersonasComponent } from './card-buscador-personas.component';

describe('CardBuscadorPersonasComponent', () => {
  let component: CardBuscadorPersonasComponent;
  let fixture: ComponentFixture<CardBuscadorPersonasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardBuscadorPersonasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBuscadorPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
