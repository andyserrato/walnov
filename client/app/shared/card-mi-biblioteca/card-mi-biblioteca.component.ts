import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
// import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Categoria } from '../../models/cats';
import { RepositorioService } from '../../services/repositorio.service';
import { ChatStory } from '../../models/chatstory.model';
import { Paginator } from '../../models/paginador';



@Component({
  selector: 'app-card-mi-biblioteca',
  templateUrl: './card-mi-biblioteca.component.html',
  styleUrls: ['./card-mi-biblioteca.component.scss']
})
export class CardMiBibliotecaComponent implements OnInit {
  //chatstories: Array<ChatStory> = new Array<ChatStory>();
  chatStoriesFiltrados: Array<ChatStory> = new Array<ChatStory>();
  filtradosVacio: boolean = true;
  // state: string = 'in';
  // isIn:boolean = true;
  @ViewChild('contenedorBiblioteca') contenedorBiblioteca: ElementRef;
  paginador = null;

  // categorias = new Array();

  chatst1: ChatStory;
  chatst2: ChatStory;
  chatst3: ChatStory;

  constructor(private repositorio: RepositorioService) {

  }

  ngOnInit() {

    this.chatst1 = new ChatStory();
    this.chatst1.categoria = this.repositorio.categoriasAL[0];
    this.chatst1.titulo = "El paseo millonario por la Gran Vía de Madrid entre dos enamorados";
    this.chatst1.urlImagen = "https://lorempixel.com/45/56";
    this.chatst1.likes = 784;
    this.chatst1.views = 2000;

    this.chatst2 = new ChatStory();
    this.chatst2.categoria = this.repositorio.categoriasAL[2];
    this.chatst2.titulo = "El hombre palo";
    this.chatst2.urlImagen = "https://lorempixel.com/45/67";
    this.chatst2.likes = 46434;
    this.chatst2.views = 2304;

    this.chatst3 = new ChatStory();

    this.chatst3.categoria = this.repositorio.categoriasAL[4];
    this.chatst3.titulo = "La mujer barbuda";
    this.chatst3.urlImagen = "https://lorempixel.com/45/52";
    this.chatst3.likes = 444;
    this.chatst3.views = 3420;

    // for(let i=0; i<20; i++) {
    //   this.chatst1 = new ChatStory();
    //   this.chatst1.categoria = this.repositorio.categoriasAL[4];
    //   this.chatst1.titulo = "El paseo millonario";
    //   this.chatst1.imagen_url = "https://lorempixel.com/45/56";
    //   this.chatst1.likes = 784;
    //   this.chatst1.views = 2000;
    //   this.addChat(this.chatst1);
    // }
    this.addChat(this.chatst1);
    this.addChat(this.chatst2);
    this.addChat(this.chatst3);

    this.sameCategoryArray("Acción");
  }

  ngAfterViewInit() {

  }

  addChat(newChat: ChatStory) {
    if (newChat) {
        this.repositorio.chatstories.push(newChat);
    }

  }

  deleteChat(oldChat: ChatStory){
    this.repositorio.chatstories.splice(this.repositorio.chatstories.indexOf(oldChat), 1);

  }

  getBorder(chatstory: ChatStory) {
    if(this.repositorio.categoriasHM.get(chatstory.categoria)){
      return 'solid 1.5px '+ this.repositorio.categoriasHM.get(chatstory.categoria).color;
    }else{
      return 'solid 1.5px '+ this.repositorio.categoriasAL[1].color;
    }


  }

  getColor(chatstory: ChatStory) {
    if(this.repositorio.categoriasHM.get(chatstory.categoria)){
      return this.repositorio.categoriasHM.get(chatstory.categoria).color;
    }else{
      return this.repositorio.categoriasAL[1].color;
    }


  }

  getNumber(numero: number) {
    if(numero>=1000) return '+' + Math.round(numero/1000) + 'K';
    return numero;

  }


  sameCategoryArray(categoria) {
    this.paginador = null;
    if (this.repositorio.chatstories != null && categoria != null){
      this.chatStoriesFiltrados = this.repositorio.chatstories.filter(ChatStory => ChatStory.categoria === categoria);
      this.filtradosVacio = this.emptyFiltrados(this.chatStoriesFiltrados);
      if(!this.filtradosVacio) {
        //let limite = this.chatStoriesFiltrados.length;
        this.paginador = new Paginator(this.chatStoriesFiltrados, this.contenedorBiblioteca, 10,5);
      }
      // if(this.state === 'out') this.state = 'in';
      // if(!this.isIn) this.isIn = true;
    }
  }

  emptyFiltrados(chats: any) {
    return chats.length === 0;
  }

  toggleState(chatstory) {
    this.repositorio.chatstories.forEach(this.stateToFalse);
    chatstory.selected = !chatstory.selected;
  }

  stateToFalse(chatstory){
    chatstory.selected = true;
  }

  getBackgroundColor (chatstory) {
    if(chatstory.selected) return '#ffffff';
    else {
      return '#4d1274';
    }

  }

  getFontColor(chatstory) {
    if(chatstory.selected) return '#000000';
    else {
      return '#ffffff';
    }

  }

  getFontWeight(chatstory) {
    if(chatstory.selected) return 'bold';
    else {
      return '500';
    }

  }

}
