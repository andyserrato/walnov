import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPremiumCheckoutComponent } from './pricing-premium-checkout.component';

describe('PricingPremiumCheckoutComponent', () => {
  let component: PricingPremiumCheckoutComponent;
  let fixture: ComponentFixture<PricingPremiumCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingPremiumCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingPremiumCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
