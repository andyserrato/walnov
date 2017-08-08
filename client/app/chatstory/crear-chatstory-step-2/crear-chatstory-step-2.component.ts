import { Component, OnInit, Input, Output, EventEmitter, ElementRef, AfterViewChecked, ViewChild } from '@angular/core';
import { ChatStory } from '../chatstory.model';
import { ChatstoryMessage } from '../../models/chatstory-message';
import {ChatstoryService} from '../../services/chatstory.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
@Component({
  selector: 'app-crear-chatstory-step-2',
  templateUrl: './crear-chatstory-step-2.component.html',
  styleUrls: ['./crear-chatstory-step-2.component.scss']
})
export class CrearChatstoryStep2Component implements OnInit, AfterViewChecked {

  @Input() chatStory: ChatStory;
  @Output() back: EventEmitter<any>;
  @Output() done: EventEmitter<any>;
  // chats: Array<ChatstoryMessage> = new Array<ChatstoryMessage>();
  @ViewChild('preview') private preview: ElementRef;
  @ViewChild('imgPlaceholder') private imgPlaceholder: ElementRef;
  message: ChatstoryMessage = new ChatstoryMessage('', '');
  editing = false;
  constructor(private chatStoryService: ChatstoryService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private alert: AlertService) {
    this.back = new EventEmitter<any>();
    this.done = new EventEmitter<any>();

  }

  ngOnInit() {

    // console.log(this.chatStory.personajes);
    if (!this.chatStory.chats) {
      this.chatStory.chats = new Array<ChatstoryMessage>();
    }
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
        this.scrollToBottom();
  }

  scrollToBottom(): void {
      try {
          this.preview.nativeElement.scrollTop = this.preview.nativeElement.scrollHeight;
      } catch (err) { }
  }

  newMessage(character: any, text: any, preview: HTMLElement, input) {
    if (character.value && character.value !== 'none' && text.value) {
      const message = new ChatstoryMessage(character.value, text.value, this.message.urlImagen, this.message.delay);
      this.chatStory.chats.push(message);
      this.message = new ChatstoryMessage('', '');
      this.editing = false;
      input.value = '';
      this.imgPlaceholder.nativeElement.innerHTML = 'Añadir Imagen';
    }

  }

  forceNewMessage() {
    this.message = new ChatstoryMessage();
    this.editing = false;
    this.imgPlaceholder.nativeElement.innerHTML = 'Añadir Imagen';
  }

  deleteMessage() {
    this.chatStory.chats.splice(this.chatStory.chats.indexOf(this.message), 1);
    this.editing = false;
    this.message = new ChatstoryMessage();
  }

  delayMessage() {
    this.message.delay = !this.message.delay;
  }

  loadMessage(m: ChatstoryMessage) {
    this.message = m;
    this.editing = true;
    this.imgPlaceholder.nativeElement.innerHTML = 'Cambiar Imagen';
  }

  getBack() {
    this.back.emit(this.chatStory);
  }

  saveChatStory() {
    if (this.authenticationService.getUser()) {
      this.chatStory.autor = this.authenticationService.getUser().id;
    } else {
      this.chatStory.autor = '597231234596d927a81e445f';
    }

    this.chatStoryService.addChatStory(this.chatStory)
      .subscribe(
      chatStory => {
        this.router.navigate(['/chatstory', chatStory.id]);
      },
      error => {
        this.alert.error('Ha ocurrido un error al intentar guardar el chatstory');
      });
  }

  viewChatStory() {
    this.done.emit(this.chatStory);
  }

  _handleReaderLoaded(e) {
        const reader = e.target;
        this.message.urlImagen = reader.result;
  }

  uploadImage(event: any){
    if (event.target.files[0].size < 5000000){
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(event.target.files[0]);
      this.imgPlaceholder.nativeElement.innerHTML = event.target.files[0].name;
    }else{
      console.log('Error al subir');
    }
  }

  deleteImage(event){
    this.imgPlaceholder.nativeElement.innerHTML = 'Añadir Imagen';
    event.value = '';
    this.message.urlImagen = '';
  }
}
