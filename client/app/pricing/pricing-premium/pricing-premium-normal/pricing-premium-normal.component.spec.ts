import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPremiumNormalComponent } from './pricing-premium-normal.component';

describe('PricingPremiumNormalComponent', () => {
  let component: PricingPremiumNormalComponent;
  let fixture: ComponentFixture<PricingPremiumNormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingPremiumNormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingPremiumNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
