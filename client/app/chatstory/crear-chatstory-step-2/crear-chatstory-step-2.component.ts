import { Component, OnInit, Input, Output, EventEmitter, ElementRef, AfterViewChecked, ViewChild } from '@angular/core';
import { ChatStory } from '../chatstory.model';
import { ChatstoryMessage } from '../../models/chatstory-message';
@Component({
  selector: 'app-crear-chatstory-step-2',
  templateUrl: './crear-chatstory-step-2.component.html',
  styleUrls: ['./crear-chatstory-step-2.component.scss']
})
export class CrearChatstoryStep2Component implements OnInit, AfterViewChecked {

  @Input() chatStory: ChatStory;
  @Output() back: EventEmitter<any>;
  // messages: Array<ChatstoryMessage> = new Array<ChatstoryMessage>();
  @ViewChild('preview') private preview: ElementRef;
  message: ChatstoryMessage = new ChatstoryMessage('none','');
  editing: boolean = false;
  constructor() {
    this.back = new EventEmitter<any>();

  }

  ngOnInit() {
    if(!this.chatStory.messages){
      this.chatStory.messages= new Array<ChatstoryMessage>();
    }
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
        this.scrollToBottom();
  }

  scrollToBottom(): void {
      try {
          this.preview.nativeElement.scrollTop = this.preview.nativeElement.scrollHeight;
      } catch(err) { }
  }

  newMessage(character: any, text: any, preview: HTMLElement, input){
    if(character.value && character.value != "none" && text.value){
      let message = new ChatstoryMessage(character.value, text.value, this.message.image_url);
      this.chatStory.messages.push(message);
      this.message = new ChatstoryMessage();
      this.editing = false;
      input.value="";
    }

  }

  forceNewMessage(){
    this.message = new ChatstoryMessage();
    this.editing = false;
  }

  deleteMessage(){
    this.chatStory.messages.splice(this.chatStory.messages.indexOf(this.message),1);
    this.editing = false;
    this.message= new ChatstoryMessage();
  }



  loadMessage(m: ChatstoryMessage){
    this.message=m;
    this.editing = true;
  }

  getBack(){
    console.log(this.chatStory.messages);
    this.back.emit(this.chatStory);
  }

  _handleReaderLoaded(e) {
        var reader = e.target;
        this.message.image_url=reader.result;
  }
  uploadImage(event: any, placeholder){
    if(event.target.files[0].size < 5000000){
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(event.target.files[0]);
      placeholder.innerHTML=event.target.files[0].name;
    }else{

      console.log("Error al subir");
    }
  }

  deleteImage(event, placeholder){
    placeholder.innerHTML="Añadir imagen";
    event.value="";
    this.message.image_url="";
  }


}
