import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Categoria } from '../../models/cats';
import { RepositorioService } from '../../services/repositorio.service';
import { Chatstory } from '../../models/chatstory.model';

@Component({
  selector: 'app-card-chatstory',
  templateUrl: './card-chatstory.component.html',
  styleUrls: ['./card-chatstory.component.scss']
})
export class CardChatstoryComponent implements OnInit {
  chatSt: Chatstory;
  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {
    this.chatSt = new Chatstory();

    this.chatSt.imagen_url = "https://lorempixel.com/63/100";
    this.chatSt.categoria = this.repositorio.categoriasAL[1];
    this.chatSt.titulo =  "Banjo tote bag bicycle rights, High.";
    this.chatSt.descripcion = "Keytar McSweeney's Williamsburg, readymade leggings try-hard 90's street art letterpress hoodie occupy Wes Anderson Banksy. Asymmetrical viral letterpress, McSweeney's seitan 3 wolf moon drinking vinegar sartorial pour-ove.";
    this.chatSt.views = 10324;
    this.chatSt.likes = 456;
  }

  getColor() {
    return this.chatSt.categoria.color;

  }

  getNumber(numero: number) {
    if(numero>=1000) return '+' + Math.round(numero/1000) + 'K';
    return numero;

  }

}
