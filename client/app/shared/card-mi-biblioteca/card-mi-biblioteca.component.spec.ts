import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMiBibliotecaComponent } from './card-mi-biblioteca.component';

describe('CardMiBibliotecaComponent', () => {
  let component: CardMiBibliotecaComponent;
  let fixture: ComponentFixture<CardMiBibliotecaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardMiBibliotecaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMiBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
