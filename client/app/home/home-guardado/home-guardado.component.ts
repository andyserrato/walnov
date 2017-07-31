import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-guardado',
  templateUrl: './home-guardado.component.html',
  styleUrls: ['./home-guardado.component.scss']
})
export class HomeGuardadoComponent implements OnInit {

  view: string;
  constructor() { }

  ngOnInit() {
    this.view='walls';
  }

  changeView(str){
    this.view=str;
  }

}
