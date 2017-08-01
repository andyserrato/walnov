import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Image } from '../../../models/image';

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.scss']
})
export class SelectImageComponent implements OnInit {
  @Output() selected = new EventEmitter();
  imgs: Array<Image>;
  selectedImage: Image;
  constructor() {
    this.imgs=new Array<Image>();
    for(let i = 0; i<12; i++){
      this.imgs.push(new Image('https://lorempixel.com/1600/1200', false));
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
    this.selected.emit(this.selectedImage.url);
  }

}
