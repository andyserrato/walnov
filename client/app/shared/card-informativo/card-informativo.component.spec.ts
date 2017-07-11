import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInformativoComponent } from './card-informativo.component';

describe('CardInformativoComponent', () => {
  let component: CardInformativoComponent;
  let fixture: ComponentFixture<CardInformativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardInformativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardInformativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
