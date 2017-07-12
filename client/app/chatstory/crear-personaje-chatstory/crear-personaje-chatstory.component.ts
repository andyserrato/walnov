import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-personaje-chatstory',
  templateUrl: './crear-personaje-chatstory.component.html',
  styleUrls: ['./crear-personaje-chatstory.component.scss']
})
export class CrearPersonajeChatstoryComponent implements OnInit {

  cols: Array<Array<string>> = new Array<Array<string>>(3);
  rows: Array<string> = new Array<string>(8);

  constructor() {
    // this.cols.find(this.cols.keys()[0]).push('Hola');
  }

  ngOnInit() {
  }

}
