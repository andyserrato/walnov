import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Categoria } from '../../models/cats';
import { RepositorioService } from '../../services/repositorio.service';
import { Chatstory } from '../../models/chatstory.model';
import { Paginator } from '../../models/paginador';

@Component({
  selector: 'app-card-mi-biblioteca-buscador',
  templateUrl: './card-mi-biblioteca-buscador.component.html',
  styleUrls: ['./card-mi-biblioteca-buscador.component.scss'],
  animations: [
    trigger("changeBackgroundColor", [
      state('notAdded', style({
      })),
      state('added', style({
        backgroundColor : '#8427bf',
        cursor: 'pointer'
      }))
    ])
  ]
})
export class CardMiBibliotecaBuscadorComponent implements OnInit {
  //chatstories: Array<Chatstory> = new Array<Chatstory>();
  added: boolean = false;
  firstAdded: boolean = false;
  state: string = 'notAdded';
  //isIn:boolean = true;
  @ViewChild('contenedorBiblioteca') contenedorBiblioteca: ElementRef;
  paginador = null;

  chatst1: Chatstory;
  chatst2: Chatstory;
  chatst3: Chatstory;

  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {
    this.chatst1 = new Chatstory();
    this.chatst1.categoria = this.repositorio.categoriasAL[0];
    this.chatst1.titulo = "El paseo millonario";
    this.chatst1.imagen_url = "https://lorempixel.com/45/56";
    this.chatst1.likes = 784;
    this.chatst1.views = 2000;

    this.chatst2 = new Chatstory();
    this.chatst2.categoria = this.repositorio.categoriasAL[6];
    this.chatst2.titulo = "El hombre palo";
    this.chatst2.imagen_url = "https://lorempixel.com/45/67";
    this.chatst2.likes = 46434;
    this.chatst2.views = 2304;

    this.chatst3 = new Chatstory();
    this.chatst3.categoria = this.repositorio.categoriasAL[7];
    this.chatst3.titulo = "La mujer barbuda";
    this.chatst3.imagen_url = "https://lorempixel.com/45/52";
    this.chatst3.likes = 444;
    this.chatst3.views = 3420;

    // this.addChat(this.chatst1);
    // this.addChat(this.chatst2);
    // this.addChat(this.chatst3);

    //this.paginador = new Paginator(this.repositorio.chatstories, this.contenedorBiblioteca, 10,5)

    for(let i=0; i<20; i++) {
     let nuevoCS = new Chatstory();

      nuevoCS.categoria = this.repositorio.categoriasAL[0];
      nuevoCS.titulo = "Hola" + i;
      nuevoCS.imagen_url = "https://lorempixel.com/45/56";
      nuevoCS.likes = 784;
      nuevoCS.views = 2000;
      this.addChat(nuevoCS);
    }

    this.paginador = new Paginator(this.repositorio.chatstories, this.contenedorBiblioteca, 10,5);


  }

  addChat(newChat: Chatstory) {
    if (newChat) {
        this.repositorio.chatstories.push(newChat);
        this.state = 'added';
        this.added = true;
        this.firstAdded = false;
        if (this.repositorio.chatstories.length === 1) this.showMessage();
        console.log("Añado");

        //this.paginador = new Paginator(this.repositorio.chatstories, this.contenedorBiblioteca, 10,5);
    }

  }

  deleteChat(oldChat: Chatstory){
    this.repositorio.chatstories.splice(this.repositorio.chatstories.indexOf(oldChat), 1);
    if(this.repositorio.chatstories.length === 0) {
      this.state = 'notAdded';
      this.added = false;

    }
    this.paginador = new Paginator(this.repositorio.chatstories, this.contenedorBiblioteca, 10,5);

  }

  getBorder(chatstory: Chatstory) {
    return 'solid 1.5px ' + chatstory.categoria.color;

  }

  getColor(chatstory: Chatstory) {
    return chatstory.categoria.color;

  }

  getNumber(numero: number) {
    if(numero>=1000) return '+' + Math.round(numero/1000) + 'K';
    return numero;

  }

  showMessage() {
    this.firstAdded = true;
    setTimeout(this.turnFalse.bind(this), 120000);
  }

  turnFalse() {
    this.firstAdded = false;
  }


  // sameCategoryArray(categoria) {
  //
  //   if (this.chatstories != null && categoria != null){
  //     this.chatStoriesFiltrados = this.chatstories.filter(Chatstory => Chatstory.categoria.nombre === categoria);
  //     this.filtradosVacio = this.emptyFiltrados(this.chatStoriesFiltrados);
  //     if(!this.filtradosVacio) {
  //       let limite = this.chatStoriesFiltrados.length;
  //       this.paginador = new Paginator(this.chatStoriesFiltrados, this.contenedorBiblioteca, 10,5);
  //     }
  //     if(this.state === 'out') this.state = 'in';
  //     if(!this.isIn) this.isIn = true;
  //   }
  // }

  // emptyFiltrados(chats: any) {
  //   return chats.length === 0;
  // }

  // toggleState() {
  //   this.state = (this.state === 'in' ? 'out' : 'in');
  //   this.isIn = !this.isIn;
  // }

}
