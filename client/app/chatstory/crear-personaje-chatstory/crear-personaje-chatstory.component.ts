import { Component, OnInit } from '@angular/core';
import { Personaje } from './personaje';

@Component({
  selector: 'app-crear-personaje-chatstory',
  templateUrl: './crear-personaje-chatstory.component.html',
  styleUrls: ['./crear-personaje-chatstory.component.scss']
})
export class CrearPersonajeChatstoryComponent implements OnInit {

  cols: Array<Personaje> = new Array<Personaje>(24);
  chars: Array<Personaje> = new Array<Personaje>();
  constructor() {
    // this.cols.find(this.cols.keys()[0]).push('Hola');

  }

  ngOnInit() {
  }

  refreshArray(){
    this.cols = new Array<Personaje>(24);
    for(let i = 0; i < this.chars.length; i++){
      this.cols[(this.chars.length-i)-1]=this.chars[i];
    }
  }

  newPerosnaje(event: HTMLInputElement){
    // console.log(event);
    if(event.value && this.chars.length<24){
      this.chars.push(new Personaje(event.value));
      this.refreshArray();
      event.value="";
    }
  }

  deletePersonaje(event){
    this.chars.splice(this.chars.indexOf(event),1);
    this.refreshArray();
  }

}
