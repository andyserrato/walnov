import { Component, OnInit, Input } from '@angular/core';
import { Personaje } from './personaje.model';

@Component({
  selector: 'app-crear-personaje-chatstory',
  templateUrl: './crear-personaje-chatstory.component.html',
  styleUrls: ['./crear-personaje-chatstory.component.scss']
})
export class CrearPersonajeChatstoryComponent implements OnInit {

  cols: Array<string> = new Array<string>(24);
  @Input() chars: Array<string>;
  constructor() {
    // this.cols.find(this.cols.keys()[0]).push('Hola');

  }

  ngOnInit() {
    this.refreshArray();
  }

  refreshArray(){
    this.cols = new Array<string>(24);
    for(let i = 0; i < this.chars.length; i++){
      this.cols[(this.chars.length-i)-1]=this.chars[i];
    }
  }

  newPerosnaje(event: HTMLInputElement){
    // console.log(event);
    if(event.value && this.chars.length<24){
      this.chars.push(event.value);
      this.refreshArray();
      event.value="";
    }
  }

  deletePersonaje(event){
    this.chars.splice(this.chars.indexOf(event),1);
    this.refreshArray();
  }

}
