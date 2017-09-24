import { Component, OnInit, Input, Output } from '@angular/core';
import { TranslateService } from '../../translate';

@Component({
  selector: 'app-card-informativo',
  templateUrl: './card-informativo.component.html',
  styleUrls: ['./card-informativo.component.scss']
})
export class CardInformativoComponent implements OnInit {
  static showCard = true;
  showButton: boolean;
  buttonText: string;
  titulo: string;
  parrafos: Array<string>;
  @Input() view: string;
  @Input() cats: any;
  @Output() desaparece: any;

  constructor(private translate: TranslateService) {
    // de forma momentánea pues no
  }

  ngOnInit() {
    CardInformativoComponent.showCard = true;
    this.showButton = true;
    this.buttonText = this.translate.instant('card_info_entendido');
    this.parrafos = new Array<string>();

    this.parrafos.push(this.translate.instant('card_info_instr'));

    if(this.view.includes("wall")){
      this.titulo = this.translate.instant('card_info_title') + ' Wall!';
      this.parrafos.push(this.translate.instant('card_info_instr_wall'));
    }else if(this.view.includes("chat")){
      this.titulo= this.translate.instant('card_info_title') + ' Chatstory!';
      this.parrafos.push(this.translate.instant('card_info_instr_chat'));
      this.parrafos.push(this.translate.instant('card_info_instr_chat_2'));
    }else if(this.view.includes("relato")){
      this.titulo = this.translate.instant('card_info_title') + ' ' + this.translate.instant('all_relato_corto');
      this.parrafos.push(this.translate.instant('card_info_instr_relato'));
    }





    this.parrafos.push(this.translate.instant('card_info_instr_2'));

  }

  public entendido () {
    CardInformativoComponent.showCard = false;
    // console.log(this.cats);
  }

  public getCard() {
    return CardInformativoComponent.showCard;
  }

}
