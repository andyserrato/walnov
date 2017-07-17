import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPublicidadComponent } from './card-publicidad.component';

describe('CardPublicidadComponent', () => {
  let component: CardPublicidadComponent;
  let fixture: ComponentFixture<CardPublicidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPublicidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPublicidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
