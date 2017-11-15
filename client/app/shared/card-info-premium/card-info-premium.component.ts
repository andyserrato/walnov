import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '../../translate';

@Component({
  selector: 'app-card-info-premium',
  templateUrl: './card-info-premium.component.html',
  styleUrls: ['./card-info-premium.component.scss']
})
export class CardInfoPremiumComponent implements OnInit {
  @Input() vista:string;
  suscrito: boolean = false;
  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  suscribir() {
    this.suscrito = true;
  }

  unsuscribe() {
    this.suscrito = false;
  }


}
