import { Component, OnInit, Input, Output, EventEmitter, ElementRef, AfterViewChecked, ViewChild } from '@angular/core';
import { ChatstoryMessage } from '../../models/chatstory-message';
import { ChatstoryService } from '../../services/chatstory.service';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertService } from '../../services/alert.service';
import { ModalService } from '../../services/modal.service';
import { RepositorioService } from '../../services/repositorio.service';
import { RegisterPopoverService } from '../../services/register-popover.service';
import { TranslateService } from '../../translate';
@Component({
  selector: 'app-crear-chatstory-step-2',
  templateUrl: './crear-chatstory-step-2.component.html',
  styleUrls: ['./crear-chatstory-step-2.component.scss']
})
export class CrearChatstoryStep2Component implements OnInit, AfterViewChecked {

  @Input() chatStory: any;
  @Output() back: EventEmitter<any>;
  @Output() done: EventEmitter<any>;
  @ViewChild('preview') private preview: ElementRef;
  @ViewChild('imgPlaceholder') private imgPlaceholder: ElementRef;
  message: ChatstoryMessage;
  @ViewChild('textArea') private textArea: ElementRef;
  editing = false;
  popover: boolean;
  constructor(private chatStoryService: ChatstoryService,
              private auth: AuthenticationService,
              private alert: AlertService,
              private translate: TranslateService,
              private modalService: ModalService,
              private repo: RepositorioService,
              private registerService: RegisterPopoverService) {
    this.back = new EventEmitter<any>();
    this.done = new EventEmitter<any>();
  }

  ngOnInit() {
    this.message = new ChatstoryMessage(this.chatStory.personajes[0], '', '');
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
      this.message = new ChatstoryMessage(character.value, '');
      this.editing = false;
      input.value = '';
      this.imgPlaceholder.nativeElement.innerHTML = this.translate.instant('chatstories_creacion_add_image');
      this.textArea.nativeElement.focus();
    }

  }

  forceNewMessage() {
    this.message = new ChatstoryMessage();
    this.editing = false;
    this.imgPlaceholder.nativeElement.innerHTML = this.translate.instant('chatstories_creacion_add_image');
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
    this.imgPlaceholder.nativeElement.innerHTML =
      this.translate.instant('shared_image_picker_changeimage') + ' ' + this.translate.instant('shared_image_picker_changeimage_2');
  }

  getBack() {
    this.back.emit(this.chatStory);
  }

  _handleReaderLoaded(e) {
        const reader = e.target;
        this.message.urlImagen = reader.result;
  }

  uploadImage(event: any) {
    if (event.target.files[0].size < 5000000) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(event.target.files[0]);
      this.imgPlaceholder.nativeElement.innerHTML = event.target.files[0].name;
    }else {
      console.log('Error al subir');
    }
  }

  deleteImage(event) {
    this.imgPlaceholder.nativeElement.innerHTML = this.translate.instant('chatstories_creacion_add_image');
    event.value = '';
    this.message.urlImagen = '';
  }

  publicarChatStory() {
    if (this.auth.isLoggedIn()) {
      if (this.chatStory.tipo === 0) {
        this.alert.warning(this.translate.instant('alert_chatstory_existente'));
        this.alert.clearTimeOutAlert();
      } else if (this.chatStory.chats.length < 5) {
        this.alert.warning(this.translate.instant('alert_chatstory_requisitos'));
        this.alert.clearTimeOutAlert();
      } else if (!this.chatStory.tipo) { //  borrador
        // set flag de publicado
        this.chatStory.tipo = 0;
        // set autorNombre
        this.chatStory.autor = this.auth.getUser().id;
        // set autor ID
        this.chatStory.autorNombre = this.auth.getUser().perfil.display_name;

        const chatStoryFulero = {lang: 'es', chatStory: this.chatStory};
        chatStoryFulero.chatStory.categoria = this.chatStory.categoria.nombre;
        // guardar
        this.chatStoryService.addChatStory(chatStoryFulero).subscribe( chatStorySaved => {
          const chatStoryUrl = '/chatstory/' + chatStorySaved.id;
          this.modalService.share(this.translate.instant('modal_chatstory_posted'), chatStoryUrl);
        }, error => {
          this.alert.error(this.translate.instant('alert_chatstory_insercion'));
          this.alert.clearTimeOutAlert();
        } );
      } else if (this.chatStory.tipo === 1) {
        this.chatStory.tipo = 0; // publicado
        const chatStoryFulero = {lang: this.translate.currentLang, chatStory: this.chatStory};
        chatStoryFulero.chatStory.categoria = this.chatStory.categoria.nombre;
        this.chatStoryService.updateChatStory(chatStoryFulero, this.chatStory.id).subscribe( chatStorySaved => {
          const chatStoryUrl = '/chatstory/' + this.chatStory.id;
          this.modalService.share(this.translate.instant('modal_chatstory_posted'), chatStoryUrl);
        }, error => {
          this.alert.error(this.translate.instant('alert_chatstory_insercion'));
          this.alert.clearTimeOutAlert();
        } );
      }
    } else {
      this.registerService.setVisible(true);
    }
  }

  guardarComoBorradorChatStory() {
    if (this.auth.isLoggedIn()) {
      if (this.chatStory.tipo === 0) {
        this.alert.warning(this.translate.instant('alert_chatstory_existente'));
        this.alert.clearTimeOutAlert();
      } else if (this.chatStory.chats.length < 5) {
        this.alert.warning(this.translate.instant('alert_chatstory_requisitos'));
        this.alert.clearTimeOutAlert();
      } else if (!this.chatStory.tipo && this.chatStory.tipo !== 0) {
        // set flag de borrador
        this.chatStory.tipo = 1;
        // set autorNombre
        this.chatStory.autor = this.auth.getUser().id;
        // set autor ID
        this.chatStory.autorNombre = this.auth.getUser().perfil.display_name;
        const chatStoryFulero = {lang: this.translate.currentLang, chatStory: this.chatStory};
        chatStoryFulero.chatStory.categoria = this.chatStory.categoria.nombre;
        // guardar
        this.chatStoryService.addChatStory(chatStoryFulero).subscribe(chatStorySaved => {
          this.chatStory = chatStorySaved;
          this.chatStory.categoria = this.repo.getCategoriaALByName(this.chatStory.categoria);
          this.chatStory.categoria.selected = true;
          this.alert.success(this.translate.instant('alert_chatstory_borrador'));
          this.alert.clearTimeOutAlert();
        }, error => this.alert.error(this.translate.instant('alert_chatstory_insercion')));
      } else if (this.chatStory.tipo && this.chatStory.tipo === 1) {
        const chatStoryFulero = {lang: this.translate.currentLang, chatStory: this.chatStory};
        chatStoryFulero.chatStory.categoria = this.chatStory.categoria.nombre;
        this.chatStoryService.updateChatStory(chatStoryFulero, this.chatStory.id).subscribe(chatStorySaved => {
          this.chatStory = chatStorySaved;
          this.chatStory.categoria = this.repo.getCategoriaALByName(this.chatStory.categoria);
          this.alert.success(this.translate.instant('alert_chatstory_borrador_updt'));
          this.alert.clearTimeOutAlert();
        }, error => this.alert.error(this.translate.instant('alert_chatstory_insercion')));
      }
    } else {
      this.registerService.setVisible(true);
    }
  }
}
