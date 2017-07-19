import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Personaje } from '../crear-personaje-chatstory/personaje.model';
import { ChatStory } from '../chatstory.model';
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
  categorias = Categoria.Categorias;
  cat: Categoria;
  constructor() {
    this.chars = new Array<string>();
    this.done = new EventEmitter<any>();
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
      let chat = new ChatStory(titulo.value, this.chars, this.cat);
      this.done.emit(chat);
  }

}
