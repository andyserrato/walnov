import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {

  @Input() white: boolean;
  constructor() { }

  ngOnInit() {
  }

  changeImage($event: HTMLElement, selectBox: HTMLElement){
    let cibox = $event;
    cibox.style.backgroundColor = "white";
    cibox.style.color = "gray";
    cibox.style.position = "absolute";
    cibox.style.height = "5em";
    selectBox.style.visibility = "visible";
    selectBox.style.opacity = "1";
    cibox.style.zIndex = "2";
    // cibox.parentElement.parentElement.style.height = "8em";
  }

}
