import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Personaje } from '../crear-personaje-chatstory/personaje.model';
import { ChatStory } from '../../models/chatstory.model';
import { RepositorioService } from '../../services/repositorio.service';
import { Categoria } from '../../models/cats';
import { AlertService } from '../../services/alert.service';
import {AuthenticationService} from '../../services/authentication.service';
@Component({
  selector: 'app-crear-chatstory-step-1',
  templateUrl: './crear-chatstory-step-1.component.html',
  styleUrls: ['./crear-chatstory-step-1.component.scss']
})
export class CrearChatstoryStep1Component implements OnInit {

  @Output() done: EventEmitter<any>;
  @Input() chatStory: ChatStory;
  categorias: Array<Categoria>;
  maxChars: Array<string> = new Array<string>(18);
  validate: any;
  constructor(private repositorio: RepositorioService, private alert: AlertService, private fb: FormBuilder, private authenticationService: AuthenticationService) {
    this.done = new EventEmitter<any>();
    this.categorias = repositorio.categoriasAL;

  }

  ngOnInit() {
    this.validate = {
        'title' : false,
        'description' : false
    };
    this.refreshArray();
  }

  refreshArray() {
    for (let i = 0; i < this.chatStory.personajes.length; i++) {
      this.maxChars[i] = this.chatStory.personajes[(this.chatStory.personajes.length - 1) - i];
    }
    console.log(this.maxChars);
  }

  validateField(event, selector) {
    console.log(event);
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
        this.alert.error('Introduce al menos un personaje');
      }

    }
  }

  changeImage(event) {
    this.chatStory.urlImagen = event;
  }

  newPersonaje(event: HTMLInputElement) {
    // console.log(event)
    if (event.value && event.value.length >= 15 ) {
      this.alert.warning('Máximo 15 caracteres');
      this.alert.clearTimeOutAlert();
    } else if (event.value && this.chatStory.personajes.length === 18) {
      this.alert.warning('Máximo 18 personajes');
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

  }

  selectChar(event) {

  }

}
