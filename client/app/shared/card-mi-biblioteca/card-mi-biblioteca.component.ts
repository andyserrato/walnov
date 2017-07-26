import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Categoria } from '../../models/cats';
import { RepositorioService } from '../../services/repositorio.service';
import { Chatstory } from '../../models/chatstory.model';
import { Paginator } from '../../models/paginador';



@Component({
  selector: 'app-card-mi-biblioteca',
  templateUrl: './card-mi-biblioteca.component.html',
  styleUrls: ['./card-mi-biblioteca.component.scss'],
  animations: [
    trigger("changeBackgroundColor", [
      state('in', style({
        cursor: 'pointer'
      })),
      state('out', style({
        backgroundColor : '#4d1274',
        cursor: 'pointer'
      })),
      transition('in => out', animate(0)),
      transition('out => in', animate(0))
    ]),
    trigger("changeColor", [
      state('in', style({
        //transform: 'scale(1)'
      })),
      state('out', style({
        color: '#ffffff',
        fontWeight:500
      })),
      transition('in => out', animate(100)),
      transition('out => in', animate(100))
    ])
  ]
})
export class CardMiBibliotecaComponent implements OnInit {
  chatstories: Array<Chatstory> = new Array<Chatstory>();
  chatStoriesFiltrados: Array<Chatstory> = new Array<Chatstory>();
  filtradosVacio: boolean = true;
  state: string = 'in';
  isIn:boolean = true;
  @ViewChild('contenedorBiblioteca') contenedorBiblioteca: ElementRef;
  paginador = null;

  categorias = new Array();

  chatst1: Chatstory;
  chatst2: Chatstory;
  chatst3: Chatstory;

  constructor(private repositorio: RepositorioService) {

  }

  ngOnInit() {

    this.chatst1 = new Chatstory();
    this.chatst1.categoria = this.repositorio.categoriasAL[0];
    this.chatst1.titulo = "El paseo millonario por la Gran Vía de Madrid entre dos enamorados";
    this.chatst1.imagen_url = "https://lorempixel.com/45/56";
    this.chatst1.likes = 784;
    this.chatst1.views = 2000;

    this.chatst2 = new Chatstory();
    this.chatst2.categoria = this.repositorio.categoriasHM.get("Romance");
    this.chatst2.titulo = "El hombre palo";
    this.chatst2.imagen_url = "https://lorempixel.com/45/67";
    this.chatst2.likes = 46434;
    this.chatst2.views = 2304;

    this.chatst3 = new Chatstory();

    this.chatst3.categoria = this.repositorio.categoriasHM.get("Romance");
    this.chatst3.titulo = "La mujer barbuda";
    this.chatst3.imagen_url = "https://lorempixel.com/45/52";
    this.chatst3.likes = 444;
    this.chatst3.views = 3420;

    for(let i=0; i<20; i++) {
      this.chatst1 = new Chatstory();
      this.chatst1.categoria = this.repositorio.categoriasAL[4];
      this.chatst1.titulo = "El paseo millonario";
      this.chatst1.imagen_url = "https://lorempixel.com/45/56";
      this.chatst1.likes = 784;
      this.chatst1.views = 2000;
      this.addChat(this.chatst1);
    }
    // this.addChat(this.chatst1);
    // this.addChat(this.chatst2);
    // this.addChat(this.chatst3);

    this.sameCategoryArray("Acción");
  }

  ngAfterViewInit() {

  }

  addChat(newChat: Chatstory) {
    if (newChat) {
        this.chatstories.push(newChat);
    }

  }

  deleteChat(oldChat: Chatstory){
    this.chatstories.splice(this.chatstories.indexOf(oldChat), 1);

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


  sameCategoryArray(categoria) {
    this.paginador = null;
    if (this.chatstories != null && categoria != null){
      this.chatStoriesFiltrados = this.chatstories.filter(Chatstory => Chatstory.categoria.nombre === categoria);
      this.filtradosVacio = this.emptyFiltrados(this.chatStoriesFiltrados);
      if(!this.filtradosVacio) {
        let limite = this.chatStoriesFiltrados.length;
        this.paginador = new Paginator(this.chatStoriesFiltrados, this.contenedorBiblioteca, 10,5);
      }
      if(this.state === 'out') this.state = 'in';
      if(!this.isIn) this.isIn = true;
    }
  }

  emptyFiltrados(chats: any) {
    return chats.length === 0;
  }

  toggleState() {
    this.state = (this.state === 'in' ? 'out' : 'in');
    this.isIn = !this.isIn;
  }

}
