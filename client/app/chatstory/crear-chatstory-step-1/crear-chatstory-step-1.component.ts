import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { ChatStory } from '../../models/chatstory.model';
import { RepositorioService } from '../../services/repositorio.service';
import { Categoria } from '../../models/cats';
import { AlertService } from '../../services/alert.service';
import {AuthenticationService} from '../../services/authentication.service';
import {TranslateService} from '../../translate';
@Component({
  selector: 'app-crear-chatstory-step-1',
  templateUrl: './crear-chatstory-step-1.component.html',
  styleUrls: ['./crear-chatstory-step-1.component.scss']
})
export class CrearChatstoryStep1Component implements OnInit {

  @Output() done: EventEmitter<any>;
  private _chatStory: any;
  categorias: Array<Categoria>;
  maxChars: Array<string> = new Array<string>(18);
  validate: any;
  constructor(private repositorio: RepositorioService,
              private translate: TranslateService,
              private alert: AlertService,
              private authenticationService: AuthenticationService) {
    this.done = new EventEmitter<any>();
    this.categorias = repositorio.categoriasAL;

  }

  ngOnInit() {
    this.validate = {
        'title' : false,
        'description' : false
    };
  }

  @Input()
  set chatStory(chatStory: any) {
    this._chatStory = chatStory;
    this.refreshArray();
  }

  get chatStory(): any { return this._chatStory; }

  refreshArray() {
    this.maxChars = new Array<string>(18);
    for (let i = 0; i < this.chatStory.personajes.length; i++) {
      this.maxChars[i] = this.chatStory.personajes[(this.chatStory.personajes.length - 1) - i];
    }
  }

  validateField(event, selector) {
    if (event.target.value) {
      this.validate[selector] = false;
    } else {
      this.validate[selector] = true;
    }
  }

  nextStep(titulo) {
    if (this.chatStory.titulo && this.chatStory.personajes.length > 0 && this.chatStory.descripcion) {
      this.alert.clear();
      this.done.emit(this.chatStory);
    }else {
      if (!this.chatStory.titulo) {
        this.validate['title'] = true;
      }
      if (!this.chatStory.descripcion) {
        this.validate['description'] = true;
      }
      if (this.chatStory.personajes.length <= 0) {
        this.alert.error(this.translate.instant('alert_crear_chatstory'));
      }

    }
  }

  changeImage(event) {
    this.chatStory.urlImagen = event;
  }

  newPersonaje(event: HTMLInputElement) {
    if (event.value && event.value.length >= 15 ) {
      this.alert.warning(this.translate.instant('alert_crear_chatstory_2'));
      this.alert.clearTimeOutAlert();
    } else if (event.value && this.chatStory.personajes.length === 18) {
      this.alert.warning(this.translate.instant('alert_crear_chatstory_3'));
      this.alert.clearTimeOutAlert();
    } else if (event.value && this.chatStory.personajes.length < 18 &&
      !this.chatStory.personajes[this.chatStory.personajes.indexOf(event.value)]) {
      this.chatStory.personajes.push(event.value);
      event.value = '';
      this.refreshArray();
    }
  }

  isUsuarioTipoPartner(): boolean {
    if (this.authenticationService.isLoggedIn()) {
      return this.authenticationService.getUser().tipo === 1;
    } else {
      return false;
    }
  }

  deleteChar(event) {
    let contador = 0;
    if (this.chatStory.chats && this.chatStory.chats.length > 0) {
      for (const c of this.chatStory.chats) {
        contador = contador + (c.personaje === event ? 1 : 0);
      }
      if (contador === 0) {
        this.chatStory.personajes.splice(this.chatStory.personajes.indexOf(event), 1);
      }else {
        this.alert.warning('Existen mensajes con este personaje');
      }
    } else {
      this.chatStory.personajes.splice(this.chatStory.personajes.indexOf(event), 1);
    }
    this.refreshArray();
  }

}
