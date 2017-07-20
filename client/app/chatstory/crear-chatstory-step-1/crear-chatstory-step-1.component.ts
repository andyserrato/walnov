import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Personaje } from '../crear-personaje-chatstory/personaje.model';
import { ChatStory } from '../chatstory.model';
import { RepositorioService } from '../../services/repositorio.service';
import { Categoria } from '../../models/cats';
@Component({
  selector: 'app-crear-chatstory-step-1',
  templateUrl: './crear-chatstory-step-1.component.html',
  styleUrls: ['./crear-chatstory-step-1.component.scss']
})
export class CrearChatstoryStep1Component implements OnInit {
  @Output() done: EventEmitter<any>;
  chars: Array<string>;
  @Input() chatStory: ChatStory;
  categorias: Array<Categoria>;
  cat: Categoria;
  constructor(private repositorio: RepositorioService) {
    this.chars = new Array<string>();
    this.done = new EventEmitter<any>();
    this.categorias = repositorio.categorias;
  }

  ngOnInit() {
    if(this.chatStory.personajes){
      this.chars = this.chatStory.personajes;
    }
    if(this.chatStory.categoria){
      this.cat=this.chatStory.categoria;
    }else{
      this.cat=this.categorias[0];
    }
  }

  nextStep(titulo){
      this.chatStory.categoria=this.cat;
      this.chatStory.titulo=titulo.value;
      this.chatStory.personajes=this.chars;
      this.done.emit(this.chatStory);
  }

  changeImage(event){
    this.chatStory.img=event;
  }

}
