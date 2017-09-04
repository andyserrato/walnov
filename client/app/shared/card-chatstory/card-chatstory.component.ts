import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Categoria } from '../../models/cats';
import { RepositorioService } from '../../services/repositorio.service';
import { ChatStory } from '../../models/chatstory.model';
import { Paginator } from '../../models/paginador';
import { CardMiBibliotecaBuscadorComponent } from '../card-mi-biblioteca-buscador/card-mi-biblioteca-buscador.component';
import { CardChatstoriesPaginadorComponent } from '../card-chatstories-paginador/card-chatstories-paginador.component';

@Component({
  selector: 'app-card-chatstory',
  templateUrl: './card-chatstory.component.html',
  styleUrls: ['./card-chatstory.component.scss']
})
export class CardChatstoryComponent implements OnInit {
  @Input() chatstory: ChatStory;

  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {

  }

  getColor() {
    return this.repositorio.categoriasHM.get(this.chatstory.categoria).color;

  }

  getNumber(numero: number) {
    if (numero >= 1000) {
      return '+' + Math.round(numero / 1000) + 'K';
    }
    return numero;

  }

  addBiblioteca() {
    if (!this.chatstory.added) {
      // this.repositorio.chatstories.push(chatstory);
      if (CardChatstoriesPaginadorComponent.firstAdded === 0) {
        CardMiBibliotecaBuscadorComponent.showMessage();
        this.repositorio.paginadorChatstoriesBiblioteca.paginador = [];
      }

      CardChatstoriesPaginadorComponent.firstAdded++;

      if (CardChatstoriesPaginadorComponent.firstAdded === 5) {
        CardMiBibliotecaBuscadorComponent.turnFalse();
      }

      this.chatstory.added = true;
      this.repositorio.paginadorChatstoriesBiblioteca.addItem(this.chatstory);
      // console.log(this.repositorio.paginadorChatstoriesBiblioteca);
    }


  }

  checkDescription() {
    if (this.chatstory.descripcion === undefined  || this.chatstory.descripcion.length === 0) {
      this.chatstory.descripcion = 'Este chatstory no tiene ninguna descripción.';
    }
    return this.chatstory.descripcion;

  }

  getBackgroundImage() {
    return 'linear-gradient(to bottom,' + this.repositorio.categoriasHM.get(this.chatstory.categoria).opacidad + ',' + this.repositorio.categoriasHM.get(this.chatstory.categoria).color + ')';
  }
}
