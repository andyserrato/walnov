import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPartnerComponent } from './pricing-partner.component';

describe('PricingPartnerComponent', () => {
  let component: PricingPartnerComponent;
  let fixture: ComponentFixture<PricingPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
