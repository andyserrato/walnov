import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Personaje } from '../crear-personaje-chatstory/personaje.model';
import { ChatStory } from '../chatstory.model';
import { RepositorioService } from '../../services/repositorio.service';
import { Categoria } from '../../models/cats';
import { AlertService } from "../../services/alert.service";
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
  maxChars: Array<string> = new Array<string>(18);

  constructor(private repositorio: RepositorioService, private alert: AlertService) {
    this.chars = new Array<string>();
    this.done = new EventEmitter<any>();
    this.categorias = repositorio.categorias;
  }

  ngOnInit() {
    if(!this.chatStory.img){
      this.chatStory.img="https://www.lorempixel.com/1600/1200";
    }
    if(this.chatStory.personajes){
      this.chars = this.chatStory.personajes;
    }
    if(this.chatStory.categoria){
      this.cat=this.chatStory.categoria;
    }else{
      this.cat=this.categorias[0];
    }
    this.refreshArray();
  }

  nextStep(titulo){
    if(titulo.value && this.cat && this.chars){
      this.chatStory.categoria=this.cat;
      this.chatStory.titulo=titulo.value;
      this.chatStory.personajes=this.chars;
      this.done.emit(this.chatStory);
    }else{
      this.alert.error('Faltan campos por rellenar');
    }
  }

  changeImage(event){
    this.chatStory.img=event;
  }

  newPerosnaje(event: HTMLInputElement){
    // console.log(event);
    if(event.value && this.chars.length<18 && !this.chars[this.chars.indexOf(event.value)]){
      this.chars.push(event.value);
      this.refreshArray();
      event.value="";
    }
  }

  refreshArray(){
    this.maxChars = new Array<string>(18);
    for(let i = 0; i < this.chars.length; i++){
      this.maxChars[(this.chars.length-i)-1]=this.chars[i];
    }
  }

}
