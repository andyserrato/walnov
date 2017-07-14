import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-publicidad',
  templateUrl: './card-publicidad.component.html',
  styleUrls: ['./card-publicidad.component.scss']
})
export class CardPublicidadComponent implements OnInit {
  image: any;
  currentPos: number;
  images: Array<string>;



  constructor() { }

  ngOnInit() {
    this.image = document.getElementById("image");
    this.currentPos = 0;
    this.images = ["https://lorempixel.com/254/134","https://lorempixel.com/254/343","https://lorempixel.com/254/443"];

    this.startTimer();

  }

  startTimer () {
    setInterval(this.volgendefoto(), 1000);
  }

  volgendefoto() {
    if (++this.currentPos >= this.images.length) this.currentPos = 0;
    this.image.src = this.images[this.currentPos];
  }

}
