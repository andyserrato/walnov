import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPremiumComponent } from './pricing-premium.component';

describe('PricingPremiumComponent', () => {
  let component: PricingPremiumComponent;
  let fixture: ComponentFixture<PricingPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingPremiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
