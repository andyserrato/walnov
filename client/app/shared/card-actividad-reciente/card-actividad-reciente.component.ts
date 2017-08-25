import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-actividad-reciente',
  templateUrl: './card-actividad-reciente.component.html',
  styleUrls: ['./card-actividad-reciente.component.scss']
})
export class CardActividadRecienteComponent implements OnInit {
  tipo:string;
  liked: boolean = false;
  constructor() { }

  ngOnInit() {
    this.tipo = 'otros';
  }

  meGusta() {
    if(!this.liked) document.getElementById('heart').className = 'fa fa-heart';
    if(this.liked) document.getElementById('heart').className = 'fa fa-heart-o';
    this.liked = !this.liked;

  }
}
