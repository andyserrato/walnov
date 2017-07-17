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
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(event.target.files[0]);
    button.innerHTML=event.target.files[0].name;
  }

}
