import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-publicidad',
  templateUrl: './card-publicidad.component.html',
  styleUrls: ['./card-publicidad.component.scss']
})
export class CardPublicidadComponent implements OnInit {
  image: any;
  currentPos: number;
  images: Array<string> = new Array<string>();

  constructor() { }

  ngOnInit() {
    this.image = document.getElementById("image");
    this.currentPos = 0;
    this.images = ["https://lorempixel.com/254/171","https://lorempixel.com/254/171","https://lorempixel.com/254/171"];

    setInterval(this.changeImage.bind(this), 30000,);

  }

  ngAfterViewInit() {

  }

  changeImage(images, image, currentPos) {
    this.image.setAttribute("src", this.images[this.currentPos]);
    this.currentPos++;
    if(this.currentPos >= this.images.length)
    {
      this.currentPos=0;
    }

  }

}
