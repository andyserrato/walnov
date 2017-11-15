import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRelatoRelevanteComponent } from './card-relato-relevante.component';

describe('CardRelatoRelevanteComponent', () => {
  let component: CardRelatoRelevanteComponent;
  let fixture: ComponentFixture<CardRelatoRelevanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardRelatoRelevanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRelatoRelevanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
