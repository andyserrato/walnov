import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoPremiumComponent } from './card-info-premium.component';

describe('CardInfoPremiumComponent', () => {
  let component: CardInfoPremiumComponent;
  let fixture: ComponentFixture<CardInfoPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardInfoPremiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardInfoPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
