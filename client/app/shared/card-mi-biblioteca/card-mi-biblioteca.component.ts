import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Categoria } from '../../models/cats';
import { RepositorioService } from '../../services/repositorio.service';
import { Chatstory } from '../../models/chatstory.model'

@Component({
  selector: 'app-card-mi-biblioteca',
  templateUrl: './card-mi-biblioteca.component.html',
  styleUrls: ['./card-mi-biblioteca.component.scss'],
  animations: [
    trigger("myTrigger", [
      state('small', style({
        transform: 'scale(1)'
      })),
      state('large', style({
        transform: 'scale(1.4)'
      })),
      state('extra-large', style({
        transform: 'scale(2)'
      })),
      state('fadeIn', style({
        opacity: '1',
        //transform: 'scale(1.2)'
      })),
      transition('void => *', [
        animate(2000, keyframes([
          style({opacity: 0, transform: 'translateY(-30px)', offset: 0}),
          style({opacity: 1, transform: 'translateY(5px) scale(1.2)', offset: .3}),
          style({opacity: 0, transform: 'translateY(0px)', offset: 1})
        ]))
      ])
    ])
  ]
})
export class CardMiBibliotecaComponent implements OnInit {
  chatstories: Array<Chatstory> = new Array<Chatstory>();
  chatStoriesFiltrados: Array<Chatstory> = new Array<Chatstory>();
  filtradosVacio: boolean = true;
  state: string = 'in';


  chatst1: Chatstory;
  chatst2: Chatstory;
  chatst3: Chatstory;

  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {

    this.chatst1 = new Chatstory();
    this.chatst1.categoria = this.repositorio.categorias[5];
    this.chatst1.titulo = "El paseo millonario por la Gran Vía de Madrid entre dos enamorados";
    this.chatst1.imagen_url = "https://lorempixel.com/45/56";
    this.chatst1.likes = 784;
    this.chatst1.views = 2000;

    this.chatst2 = new Chatstory();
    this.chatst2.categoria = this.repositorio.categorias[6];
    this.chatst2.titulo = "El hombre palo";
    this.chatst2.imagen_url = "https://lorempixel.com/45/67";
    this.chatst2.likes = 46434;
    this.chatst2.views = 2304;

    this.chatst3 = new Chatstory();

    this.chatst3.categoria = this.repositorio.categorias[7];
    this.chatst3.titulo = "La mujer barbuda";
    this.chatst3.imagen_url = "https://lorempixel.com/45/52";
    this.chatst3.likes = 444;
    this.chatst3.views = 3420;

    this.addChat(this.chatst1);
    this.addChat(this.chatst2);
    this.addChat(this.chatst3);

    this.sameCategoryArray("Acción");
    //this.filtradosVacio = (this.chatStoriesFiltrados.length === 0);
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
    return 'solid 1.2px ' + chatstory.categoria.color;

  }

  getColor(chatstory: Chatstory) {
    return chatstory.categoria.color;

  }

  getNumber(numero: number) {
    if(numero>=1000) return '+' + Math.round(numero/1000) + 'K';
    return numero;

  }


  sameCategoryArray(categoria) {
    if (this.chatstories != null && categoria != null){
      this.chatStoriesFiltrados = this.chatstories.filter(Chatstory => Chatstory.categoria.nombre === categoria);
      this.filtradosVacio = this.emptyFiltrados(this.chatStoriesFiltrados);
    }

  }

  emptyFiltrados(chats: any) {
    return chats.length === 0;
  }

  toggleState() {
    this.state = (this.state === 'in' ? 'out' : 'in');
  }

}
