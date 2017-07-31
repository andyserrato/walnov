import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Categoria } from '../../models/cats';
import { RepositorioService } from '../../services/repositorio.service';
import { Chatstory } from '../../models/chatstory.model';
import { Paginator } from '../../models/paginador';
import { CardMiBibliotecaBuscadorComponent } from '../card-mi-biblioteca-buscador/card-mi-biblioteca-buscador.component';

@Component({
  selector: 'app-card-chatstory',
  templateUrl: './card-chatstory.component.html',
  styleUrls: ['./card-chatstory.component.scss']
})
export class CardChatstoryComponent implements OnInit {
  @Input() chatstory: Chatstory;
  constructor(private repositorio: RepositorioService) { }

  ngOnInit(){

  }

  getColor(chatstory: Chatstory) {
    return chatstory.categoria.color;

  }

  getNumber(numero: number) {
    if(numero>=1000) return '+' + Math.round(numero/1000) + 'K';
      return numero;

  }

  checkDescription(chatstory: Chatstory){
    if(chatstory.descripcion === undefined  || chatstory.descripcion.length ===0) {
      chatstory.descripcion = "Este chatstory no tiene ninguna descripción."

    }
    return chatstory.descripcion;

  }
}
