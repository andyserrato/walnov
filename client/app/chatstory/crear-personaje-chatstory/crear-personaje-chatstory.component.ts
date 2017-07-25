import { Component, OnInit, Input } from '@angular/core';
import { Personaje } from './personaje.model';

@Component({
  selector: 'app-crear-personaje-chatstory',
  templateUrl: './crear-personaje-chatstory.component.html',
  styleUrls: ['./crear-personaje-chatstory.component.scss']
})
export class CrearPersonajeChatstoryComponent implements OnInit {

  @Input() maxChars: Array<string>;
  @Input() chars: Array<string>;
  constructor() {
    // this.cols.find(this.cols.keys()[0]).push('Hola');

  }

  ngOnInit() {
    // this.refreshArray();
  }

  refreshArray(){
    this.maxChars = new Array<string>(18);
    for(let i = 0; i < this.chars.length; i++){
      this.maxChars[(this.chars.length-i)-1]=this.chars[i];
    }
  }

  deletePersonaje(event){
    this.chars.splice(this.chars.indexOf(event),1);
    this.refreshArray();
  }

}
