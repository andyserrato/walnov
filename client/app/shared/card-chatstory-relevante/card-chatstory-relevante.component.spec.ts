import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardChatstoryRelevanteComponent } from './card-chatstory-relevante.component';

describe('CardChatstoryRelevanteComponent', () => {
  let component: CardChatstoryRelevanteComponent;
  let fixture: ComponentFixture<CardChatstoryRelevanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardChatstoryRelevanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardChatstoryRelevanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
