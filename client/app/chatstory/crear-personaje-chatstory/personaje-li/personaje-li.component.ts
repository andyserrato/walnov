import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Personaje } from '../personaje.model';
@Component({
  selector: 'app-personaje-li',
  templateUrl: './personaje-li.component.html',
  styleUrls: ['./personaje-li.component.scss']
})
export class PersonajeLiComponent implements OnInit {

  @Input() personaje: string;
  @Output() deleted: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  deletePersonaje(personaje: string){
    this.deleted.emit(personaje);
  }

}
