import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoRelatoComponent } from './card-info-relato.component';

describe('CardInfoRelatoComponent', () => {
  let component: CardInfoRelatoComponent;
  let fixture: ComponentFixture<CardInfoRelatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardInfoRelatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardInfoRelatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
