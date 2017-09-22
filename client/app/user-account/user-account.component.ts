import { Component, OnInit } from '@angular/core';
import { CardInformativoComponent } from '../shared/card-informativo/card-informativo.component';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  view: string;
  constructor() {
    this.view = 'datos';
  }

  ngOnInit() {
  }

  getInfoCard() {
    return CardInformativoComponent.showCard;
  }

}
