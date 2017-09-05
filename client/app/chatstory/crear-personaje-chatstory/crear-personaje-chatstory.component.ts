import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Personaje } from './personaje.model';

@Component({
  selector: 'app-crear-personaje-chatstory',
  templateUrl: './crear-personaje-chatstory.component.html',
  styleUrls: ['./crear-personaje-chatstory.component.scss']
})
export class CrearPersonajeChatstoryComponent implements OnInit {
  @Output() deleteChar: EventEmitter<any>;
  @Input() chars: Array<string>;
  constructor() {
    // this.cols.find(this.cols.keys()[0]).push('Hola');
    this.deleteChar = new EventEmitter<any>();

    // this.refreshArray();
  }

  ngOnInit() {
    // this.refreshArray();
  }

  deletePersonaje(event) {
    this.deleteChar.emit(event);
  }

}
