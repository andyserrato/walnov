import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRelatoComponent } from './card-relato.component';

describe('CardRelatoComponent', () => {
  let component: CardRelatoComponent;
  let fixture: ComponentFixture<CardRelatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardRelatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRelatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
