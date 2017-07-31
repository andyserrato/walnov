import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Categoria } from '../../models/cats';
import { RepositorioService } from '../../services/repositorio.service';
import { Chatstory } from '../../models/chatstory.model';
import { Paginator } from '../../models/paginador';
import { CardMiBibliotecaBuscadorComponent } from '../card-mi-biblioteca-buscador/card-mi-biblioteca-buscador.component';

@Component({
  selector: 'app-card-chatstories-paginador',
  templateUrl: './card-chatstories-paginador.component.html',
  styleUrls: ['./card-chatstories-paginador.component.scss']
})
export class CardChatstoriesPaginadorComponent implements OnInit {
  chatSt: Chatstory;
  firstAdded: number = 0;
  @Input() chatStoriesFiltrados: Array<Chatstory>;
  filtradosVacio: boolean = true;
  //chatstories: Array<Chatstory>;
  paginador = null;
  @ViewChild('contenedorBiblioteca') contenedorBiblioteca: ElementRef;

  constructor(private repositorio: RepositorioService) { }

  chatst1: Chatstory;
  chatst2: Chatstory;
  chatst3: Chatstory;

  ngOnInit() {
    this.chatSt = new Chatstory();
    //this.chatStoriesFiltrados = new Array<Chatstory>();

    this.chatSt.imagen_url = "https://lorempixel.com/63/100";
    this.chatSt.categoria = this.repositorio.categoriasAL[1];
    this.chatSt.titulo =  "Banjo tote bag bicycle rights, High.";
    this.chatSt.descripcion = "Keytar McSweeney's Williamsburg, readymade leggings try-hard 90's street art letterpress hoodie occupy Wes Anderson Banksy. Asymmetrical viral letterpress, McSweeney's seitan 3 wolf moon drinking vinegar sartorial pour-ove.";
    this.chatSt.views = 10324;
    this.chatSt.likes = 456;

    this.chatst1 = new Chatstory();
    this.chatst1.categoria = this.repositorio.categoriasAL[0];
    this.chatst1.titulo = "El paseo millonario";
    this.chatst1.imagen_url = "https://lorempixel.com/63/100";
    this.chatst1.likes = 784;
    this.chatst1.views = 2000;

    this.chatst2 = new Chatstory();
    this.chatst2.categoria = this.repositorio.categoriasAL[6];
    this.chatst2.titulo = "El hombre palo";
    this.chatst2.imagen_url = "https://lorempixel.com/63/100";
    this.chatst2.likes = 46434;
    this.chatst2.views = 2304;

    this.chatst3 = new Chatstory();
    this.chatst3.categoria = this.repositorio.categoriasAL[7];
    this.chatst3.titulo = "La mujer barbuda";
    this.chatst3.imagen_url = "https://lorempixel.com/63/100";
    this.chatst3.likes = 444;
    this.chatst3.views = 3420;

    for(let i=0; i<50; i++) {
     let nuevoCS = new Chatstory();

      nuevoCS.categoria = this.repositorio.categoriasAL[0];
      nuevoCS.titulo = "Hola" + i;
      nuevoCS.imagen_url = "https://lorempixel.com/63/100";
      nuevoCS.likes = 784;
      nuevoCS.views = 2000;
      this.addChat(nuevoCS);
    }

    this.addChat(this.chatSt);
    this.addChat(this.chatst1);
    this.addChat(this.chatst2);
    this.addChat(this.chatst3);

    let limite = this.chatStoriesFiltrados.length;

    this.repositorio.paginadorCardsChatstories = new Paginator(this.chatStoriesFiltrados, this.contenedorBiblioteca, 20, 10);
  }


  addChat(newChat: Chatstory) {
    if (newChat) {
        this.repositorio.chatstories.push(newChat);
    }

  }

  deleteChat(oldChat: Chatstory){
    this.repositorio.chatstories.splice(this.repositorio.chatstories.indexOf(oldChat), 1);

  }

  getColor(chatstory: Chatstory) {
    return chatstory.categoria.color;

  }

  getNumber(numero: number) {
    if(numero>=1000) return '+' + Math.round(numero/1000) + 'K';
    return numero;

  }

  addBiblioteca(chatstory: Chatstory) {
    if(!chatstory.added) {
      //this.repositorio.chatstories.push(chatstory);
      if(this.firstAdded === 0) {
        CardMiBibliotecaBuscadorComponent.showMessage();
      }

      this.firstAdded++;

      if(this.firstAdded === 5) {
        CardMiBibliotecaBuscadorComponent.turnFalse();
      }

      chatstory.added = true;
      this.repositorio.paginadorChatstoriesBiblioteca.addItem(chatstory);
      //console.log(this.repositorio.paginadorChatstoriesBiblioteca);
    }


  }

  // checkCategory(chatstory) {
  //   this.paginador = new Paginator(this.chatStoriesFiltrados, this.contenedorBiblioteca, 20,10);
  //   return true;
  // }

  checkDescription(chatstory: Chatstory){
    if(chatstory.descripcion === undefined  || chatstory.descripcion.length ===0) {
      chatstory.descripcion = "Este chatstory no tiene ninguna descripción."

    }
    return chatstory.descripcion;

  }

  emptyFiltrados(chats: any) {
    return chats.length === 0;
  }

}
