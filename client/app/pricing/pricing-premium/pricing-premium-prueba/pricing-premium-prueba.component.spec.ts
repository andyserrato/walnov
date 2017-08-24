import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPremiumPruebaComponent } from './pricing-premium-prueba.component';

describe('PricingPremiumPruebaComponent', () => {
  let component: PricingPremiumPruebaComponent;
  let fixture: ComponentFixture<PricingPremiumPruebaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingPremiumPruebaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingPremiumPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
