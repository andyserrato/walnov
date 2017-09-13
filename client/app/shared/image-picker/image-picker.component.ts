import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { RegisterPopoverService } from '../../services/register-popover.service';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {
  view:string;
  focus: boolean;
  @Input() white: boolean;
  @Output() imageUploaded: EventEmitter<any>;
  constructor(private auth: AuthenticationService,
              private regitserPopover: RegisterPopoverService) {
    this.focus=false;
    this.view="select";
    this.imageUploaded = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  changeView(int: string){
    this.view=int;
  }

  expand($event: HTMLElement, selectBox: HTMLElement){
    if(this.auth.isLoggedIn()){
      let cibox = $event;
      if(!this.focus){
        cibox.style.backgroundColor = "white";
        cibox.style.color = "gray";
        cibox.style.position = "absolute";
        cibox.style.height = "100%";
        selectBox.style.display="block";
        cibox.style.zIndex = "2";
        // cibox.parentElement.parentElement.style.height = "8em";
        this.focus=true;
      }else{
        cibox.removeAttribute("style");
        selectBox.removeAttribute("style");
        this.focus=false;
        this.view="select";
      }
    }else{
      this.regitserPopover.setVisible(true);
    }

  }

  uploadImage(event,$event,selectBox){
    if(event){
        this.imageUploaded.emit(event);
    }
    this.expand($event, selectBox);
  }

}
