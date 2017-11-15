import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
//import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Categoria } from '../../models/cats';
import { RepositorioService } from '../../services/repositorio.service';
import { ChatStory } from '../../models/chatstory.model';
import { Paginator } from '../../models/paginador';

@Component({
  selector: 'app-card-mi-biblioteca-buscador',
  templateUrl: './card-mi-biblioteca-buscador.component.html',
  styleUrls: ['./card-mi-biblioteca-buscador.component.scss'],
  // animations: [
  //   trigger("changeBackgroundColor", [
  //     state('notAdded', style({
  //     })),
  //     state('added', style({
  //       backgroundColor : '#8427bf',
  //       cursor: 'pointer'
  //     }))
  //   ])
  // ]
})
export class CardMiBibliotecaBuscadorComponent implements OnInit {
  //chatstories: Array<ChatStory> = new Array<ChatStory>();


  static added = false;
  static firstAdded = false;
  //state: string = 'notAdded';
  //isIn:boolean = true;
  @ViewChild('contenedorBiblioteca') contenedorBiblioteca: ElementRef;
  paginador = null;

  chatst1: ChatStory;
  chatst2: ChatStory;
  chatst3: ChatStory;

  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {


    this.chatst1 = new ChatStory();
    this.chatst1.categoria = this.repositorio.categoriasAL[0];
    this.chatst1.titulo = 'El paseo millonario';
    this.chatst1.urlImagen = 'https://lorempixel.com/45/56';
    this.chatst1.likes = 784;
    this.chatst1.views = 2000;

    this.chatst2 = new ChatStory();
    this.chatst2.categoria = this.repositorio.categoriasAL[6];
    this.chatst2.titulo = 'El hombre palo';
    this.chatst2.urlImagen = 'https://lorempixel.com/45/67';
    this.chatst2.likes = 46434;
    this.chatst2.views = 2304;

    this.chatst3 = new ChatStory();
    this.chatst3.categoria = this.repositorio.categoriasAL[7];
    this.chatst3.titulo = 'La mujer barbuda';
    this.chatst3.urlImagen = 'https://lorempixel.com/45/52';
    this.chatst3.likes = 444;
    this.chatst3.views = 3420;

    // this.addChat(this.chatst1);
    // this.addChat(this.chatst2);
    // this.addChat(this.chatst3);

    //this.paginador = new Paginator(this.repositorio.chatstories, this.contenedorBiblioteca, 10,5)

    // for(let i=0; i<20; i++) {
    //  let nuevoCS = new ChatStory();
    //
    //   nuevoCS.categoria = this.repositorio.categoriasAL[0];
    //   nuevoCS.titulo = "Hola" + i;
    //   nuevoCS.urlImagen = "https://lorempixel.com/45/56";
    //   nuevoCS.likes = 784;
    //   nuevoCS.views = 2000;
    //   this.addChat(nuevoCS);
    // }

    this.repositorio.paginadorChatstoriesBiblioteca = new Paginator(this.repositorio.chatstories, this.contenedorBiblioteca, 2, 1);
    //console.log(this.repositorio.paginadorChatstoriesBiblioteca);


  }

  addChat(newChat: ChatStory) {
    if (newChat) {
        //this.paginador = new Paginator(this.repositorio.chatstories, this.contenedorBiblioteca, 10,5);
        //this.repositorio.chatstories.push(newChat);
        //this.paginador.addItem(newChat);
        // this.state = 'added';
        // this.added = true;
        // this.firstAdded = false;
        // if (this.repositorio.chatstories.length === 1) this.showMessage();
        // console.log("Añado");

        //this.paginador = new Paginator(this.repositorio.chatstories, this.contenedorBiblioteca, 10,5);
    }

  }

  deleteChat(oldChat: ChatStory){
    this.repositorio.chatstories.splice(this.repositorio.chatstories.indexOf(oldChat), 1);
    if (this.repositorio.chatstories.length === 0) {

    }

  }

  getBorder(chatstory: ChatStory) {
    // console.log('solid 1.5px '+chatstory.categoria.color);
    return 'solid 1.5px ' + this.repositorio.categoriasHM.get(chatstory.categoria).color;
  }

  getColor(chatstory: ChatStory) {
    return this.repositorio.categoriasHM.get(chatstory.categoria).color;

  }

  getNumber(numero: number) {
    if (numero >= 1000) {
      return '+' + Math.round(numero / 1000) + 'K';
    }
    return numero;

  }

  static showMessage() {
    CardMiBibliotecaBuscadorComponent.firstAdded = true;
    CardMiBibliotecaBuscadorComponent.added = true;
    //setTimeout(CardMiBibliotecaBuscadorComponent.turnFalse.bind(this), 30000);
  }

  getFirstAdded() {
    return CardMiBibliotecaBuscadorComponent.firstAdded;
  }

  getAdded() {
    return CardMiBibliotecaBuscadorComponent.added;
  }

  addedBiblioteca(chatstory) {
    return chatstory.added;
  }

  static turnFalse() {
    CardMiBibliotecaBuscadorComponent.firstAdded = false;
  }

  getBc() {
    if (CardMiBibliotecaBuscadorComponent.added) {
      return '#8427bf';
    } else {
      return '#c0c0c0';
    }

  }

  getCursor() {
    if (CardMiBibliotecaBuscadorComponent.added) {return 'pointer'; }
  }

}
