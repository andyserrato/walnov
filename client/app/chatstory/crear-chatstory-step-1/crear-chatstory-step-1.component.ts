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
  @Input() chatStory: ChatStory;
  categorias: Array<Categoria>;
  maxChars: Array<string> = new Array<string>(18);

  constructor(private repositorio: RepositorioService, private alert: AlertService) {
    this.done = new EventEmitter<any>();
    this.categorias = repositorio.categoriasAL;
  }

  ngOnInit() {
    this.refreshArray();
  }

  refreshArray(){
    for(let i = 0; i<this.chatStory.personajes.length; i++){
      this.maxChars[i]=this.chatStory.personajes[(this.chatStory.personajes.length-1)-i];
    }
    console.log(this.maxChars);
  }

  nextStep(titulo){
    if(this.chatStory.titulo && this.chatStory.personajes.length>0 && this.chatStory.description){
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
    if(event.value && this.chatStory.personajes.length<18 && !this.chatStory.personajes[this.chatStory.personajes.indexOf(event.value)]){
      this.chatStory.personajes.push(event.value);
      event.value="";
      this.refreshArray();
    }
  }

  deleteChar(event){

  }

}
