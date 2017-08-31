import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { RepositorioService } from '../../../services/repositorio.service';
import { Relato } from '../../../models/relato';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';
import { ModalService } from '../../../services/modal.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-crear-relato-content',
  templateUrl: './crear-relato-content.component.html',
  styleUrls: ['./crear-relato-content.component.scss']
})

export class CrearRelatoContentComponent implements OnInit {
  @Input() relato: Relato;
  friends: Array<string>;
  dedicatorias: Array<string>;
  dedicatoriaForm: FormControl;
  complexForm: any;
  popover = false;
  publicando = false;
  @ViewChild('textarea') textarea: ElementRef;
  constructor(private repositorio: RepositorioService, fb: FormBuilder, private alert: AlertService, private modal: ModalService, private auth: AuthenticationService) {
    this.dedicatorias = new Array<string>();
    this.friends = new Array<string>();
    this.complexForm = fb.group({
      'title' : [null, Validators.compose([Validators.required , Validators.maxLength(30)])],
      'content' : [null, Validators.compose([Validators.required, Validators.maxLength(3000)])]
    });
    this.dedicatoriaForm = new FormControl();
    this.dedicatoriaForm.setValidators(Validators.compose([Validators.required, Validators.email]));
  }

  ngOnInit() {

  }

  newFriend(event) {
    if (event.value && this.friends.indexOf(event.value) == -1){
      this.friends.push(event.value);
    }
    event.value = '';
  }

  deleteFriend(event) {
    this.friends.splice(this.friends.indexOf(event), 1);
  }

  newDedicatoria(event) {
    if (this.dedicatoriaForm.valid) {
      this.dedicatorias.push(event.target.value);
      event.target.value = '';
    }else{
      this.alert.warning('Escribe una dirección de email correcta');
    }

  }

  deleteDedicatoria(event) {
    this.dedicatorias.splice(this.dedicatorias.indexOf(event), 1);
  }

  changeImage(event) {
    this.relato.imagen_url = event;
  }

  publish() {
    if (this.complexForm.valid) {
      if (this.auth.isLoggedIn()){
        this.share();
      }else{
        this.popover = true;
      }
    }else{
      this.complexForm.controls['title'].markAsTouched();
      this.complexForm.controls['content'].markAsTouched();
    }
  }

  share(){
    this.modal.share('¡Relato publicado con éxito!', '');
    this.publicando = true;
    setTimeout(() => {
      this.publicando = false;
    }, 1000);
  }
}
