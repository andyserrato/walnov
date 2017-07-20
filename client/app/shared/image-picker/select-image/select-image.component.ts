import { Component, OnInit } from '@angular/core';

export class Image{
  selected: boolean;
  url: string;
  constructor(url:string, sel: boolean){
    this.url=url;
    this.selected=sel;
  }
}
@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.scss']
})
export class SelectImageComponent implements OnInit {
  imgs: Array<Image>;
  selectedImage: Image;
  constructor() {
    this.imgs=new Array<Image>();
    for(let i = 0; i<12; i++){
      this.imgs.push(new Image('https://lorempixel.com/147/73', false));
    }
  }

  ngOnInit() {
  }

  resetImages(){
    for(let image of this.imgs){
      image.selected=false;
    }
  }

  selectImage(img: Image){
    this.resetImages();
    this.imgs[this.imgs.indexOf(img)].selected=true;
    this.selectedImage = img;
  }

}
