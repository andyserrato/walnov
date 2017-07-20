import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  @Output() canceled: EventEmitter<any>;
  @Output() uploaded: EventEmitter<any>;
  url: string;
  IMAGE_SIZE: number = 5000000;
  IMAGE_HEIGHT: number = 1200;
  IMAGE_WIDTH: number = 1600;
  //IMAGE_SIZE = tamaño de la imagen en bytes
  constructor() {
    this.canceled = new EventEmitter<any>();
    this.uploaded = new EventEmitter<any>();
   }

  ngOnInit() {
  }

  upload(){
    if(this.url){
      this.uploaded.emit(this.url);
    }else{
      this.uploaded.emit();
    }
  }

  cancel(){
    this.canceled.emit();
  }

  _handleReaderLoaded(e) {
        var reader = e.target;
        this.url=reader.result;
  }
  handleFileUpload(event: any, button: HTMLElement){
    if(event.target.files[0].size < this.IMAGE_SIZE){
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(event.target.files[0]);
      button.innerHTML=event.target.files[0].name;
    }else{
      button.innerHTML="Error al subir, imagen muy grande";
      console.log("Error al subir");
    }

  }

}
