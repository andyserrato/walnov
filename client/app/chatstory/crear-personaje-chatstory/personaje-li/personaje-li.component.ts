import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Personaje } from '../personaje';
@Component({
  selector: 'app-personaje-li',
  templateUrl: './personaje-li.component.html',
  styleUrls: ['./personaje-li.component.scss']
})
export class PersonajeLiComponent implements OnInit {

  @Input() personaje: Personaje;
  @Output() deleted: EventEmitter<Personaje> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  deletePersonaje(personaje: Personaje){
    this.deleted.emit(personaje);
  }

}
