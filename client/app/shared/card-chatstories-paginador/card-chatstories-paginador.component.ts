import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Categoria } from '../../models/cats';
import { RepositorioService } from '../../services/repositorio.service';
import { ChatStory } from '../../models/chatstory.model';
import { Paginator } from '../../models/paginador';

@Component({
  selector: 'app-card-chatstories-paginador',
  templateUrl: './card-chatstories-paginador.component.html',
  styleUrls: ['./card-chatstories-paginador.component.scss']
})
export class CardChatstoriesPaginadorComponent implements OnInit {
  static firstAdded = 0;
  chatSt: ChatStory;
  @Input() chatStoriesFiltrados: Array<ChatStory>;
  @Input() categoria: Categoria;
  filtradosVacio = true;
  @Output() more: EventEmitter<any> = new EventEmitter<any>();;
  // chatstories: Array<ChatStory>;
  paginador = null;
  chatst1: ChatStory;
  chatst2: ChatStory;
  chatst3: ChatStory;
  @ViewChild('contenedorBiblioteca') contenedorBiblioteca: ElementRef;

  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {
    this.chatSt = new ChatStory();
    // this.chatStoriesFiltrados = new Array<ChatStory>();

    this.chatSt.urlImagen = 'https://lorempixel.com/63/100';
    this.chatSt.categoria = this.repositorio.categoriasAL[1];
    this.chatSt.titulo =  'Banjo tote bag bicycle rights, High.';
    this.chatSt.descripcion = 'Keytar McSweeney\'s Williamsburg, readymade leggings try-hard 90\'s street art ' +
      'letterpress hoodie occupy Wes Anderson Banksy. Asymmetrical viral letterpress, McSweeney\'s seitan 3 wolf ' +
      'moon drinking vinegar sartorial pour-ove.';
    this.chatSt.views = 10324;
    this.chatSt.likes = 456;

    this.chatst1 = new ChatStory();
    this.chatst1.categoria = this.repositorio.categoriasAL[0];
    this.chatst1.titulo = 'El paseo millonario';
    this.chatst1.urlImagen = 'https://lorempixel.com/63/100';
    this.chatst1.likes = 784;
    this.chatst1.views = 2000;

    this.chatst2 = new ChatStory();
    this.chatst2.categoria = this.repositorio.categoriasAL[6];
    this.chatst2.titulo = 'El hombre palo';
    this.chatst2.urlImagen = 'https://lorempixel.com/63/100';
    this.chatst2.likes = 46434;
    this.chatst2.views = 2304;

    this.chatst3 = new ChatStory();
    this.chatst3.categoria = this.repositorio.categoriasAL[7];
    this.chatst3.titulo = 'La mujer barbuda';
    this.chatst3.urlImagen = 'https://lorempixel.com/63/100';
    this.chatst3.likes = 444;
    this.chatst3.views = 3420;

    for (let i = 0; i < 50; i++) {
     const nuevoCS = new ChatStory();

      nuevoCS.categoria = this.repositorio.categoriasAL[0];
      nuevoCS.titulo = 'Hola' + i;
      nuevoCS.urlImagen = 'https://lorempixel.com/63/100';
      nuevoCS.likes = 784;
      nuevoCS.views = 2000;
      this.repositorio.chatstories.push(nuevoCS);
      // this.repositorio.chatstories.push(nuevoCS);
    }

    this.repositorio.chatstories.push(this.chatSt);
    this.repositorio.chatstories.push(this.chatst1);
    this.repositorio.chatstories.push(this.chatst2);
    this.repositorio.chatstories.push(this.chatst3);

    // let limite = this.chatStoriesFiltrados.length;

    this.repositorio.paginadorCardsChatstories = new Paginator(this.chatStoriesFiltrados, this.contenedorBiblioteca, 12, 6);
}

  getBackgroundImage() {
    return 'linear-gradient(to bottom,' + this.categoria.opacidad + ',' + this.categoria.color + ')';
  }

  loadMore() {
    this.more.emit();
    
  }
}
