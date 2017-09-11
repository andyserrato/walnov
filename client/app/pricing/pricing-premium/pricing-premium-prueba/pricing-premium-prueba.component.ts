import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../../translate';
@Component({
  selector: 'app-pricing-premium-prueba',
  templateUrl: './pricing-premium-prueba.component.html',
  styleUrls: ['./pricing-premium-prueba.component.scss']
})
export class PricingPremiumPruebaComponent implements OnInit {
  ingles: boolean;
  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.ingles = this.translate.currentLang === 'en';
  }

}
