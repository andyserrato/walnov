import { Component, OnInit,Input } from '@angular/core';
import { Wall } from '../../models/wall';
import { Historia } from '../../models/historia';

@Component({
  selector: 'app-card-historia',
  templateUrl: './card-historia.component.html',
  styleUrls: ['./card-historia.component.scss']
})
export class CardHistoriaComponent implements OnInit {
  @Input() historia: Historia;
  // ranking: number;
  constructor() { }

  ngOnInit() {
    // this.ranking = 2;
  }

  getNumber(numero: number) {
    if(numero>=1000) return '+' + Math.round(numero/1000) + 'K';
    return numero;

  }

  getColor() {
    return this.historia.wall.cat.color;

  }

  getSubstring() {
    if(this.historia.texto.length > 154) {
      return this.historia.texto.substring(0,154);
    }
    else {
      return this.historia.texto;
    }
  }
}
