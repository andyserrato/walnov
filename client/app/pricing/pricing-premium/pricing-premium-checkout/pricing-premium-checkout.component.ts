import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { RepositorioService } from '../../../services/repositorio.service';

@Component({
  selector: 'app-pricing-premium-checkout',
  templateUrl: './pricing-premium-checkout.component.html',
  styleUrls: ['./pricing-premium-checkout.component.scss']
})
export class PricingPremiumCheckoutComponent implements OnInit {
  @ViewChild("divCapturado") divCapturado: ElementRef;
  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {
    this.divCapturado.nativeElement.innerHTML = this.repositorio.PricingDiv.innerHTML;
    console.log(this.repositorio.PricingDiv);
  }

}
