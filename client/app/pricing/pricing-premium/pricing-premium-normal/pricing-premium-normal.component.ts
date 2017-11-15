import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import { RepositorioService } from '../../../services/repositorio.service';
import { TranslateService} from '../../../translate';
@Component({
  selector: 'app-pricing-premium-normal',
  templateUrl: './pricing-premium-normal.component.html',
  styleUrls: ['./pricing-premium-normal.component.scss']
})
export class PricingPremiumNormalComponent implements OnInit {
  @Output() vista: EventEmitter<String>;
  planSel: boolean = false;
  ingles: boolean;

  constructor(private router: Router, private repositorio: RepositorioService, private translate: TranslateService) {
    this.vista= new EventEmitter();
    this.ingles = translate.currentLang === 'en';
  }

  ngOnInit() {
  }

  pruebaGratis() {
    this.vista.emit("prueba");

  }

  capturaDiv(div: any) {
    for(let i = 0; i<6; i++) {
      document.getElementById('line' + i).className += ' line-nuevo';
    }

    for(let i = 0; i<40; i++) {
      document.getElementById('color' + i).className += ' color-nuevo';
    }

    this.repositorio.PricingDiv = div;
    this.vista.emit("checkout");

  }

}
