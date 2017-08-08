import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RepositorioService } from '../../../services/repositorio.service';
import { Relato } from '../../../models/relato';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-crear-relato-content',
  templateUrl: './crear-relato-content.component.html',
  styleUrls: ['./crear-relato-content.component.scss']
})
export class CrearRelatoContentComponent implements OnInit {
  relato: Relato;
  friends: Array<string>;
  dedicatorias: Array<string>;
  dedicatoriaForm: FormControl;
  complexForm: any;
  publicado: boolean = false;
  @ViewChild('textarea') textarea: ElementRef;

  constructor(private repositorio: RepositorioService, fb: FormBuilder, private alert: AlertService) {
    this.dedicatorias=new Array<string>();
    this.friends=new Array<string>();
    this.relato=new Relato();
    this.relato.imagen_url="http://www.lorempixel.com/1200/1600";
    this.relato.categoria = this.repositorio.categoriasAL[0];
    this.relato.titulo="";
    this.relato.texto="";
    this.complexForm = fb.group({
      'title' : [null, Validators.compose([Validators.required ,Validators.maxLength(30)])],
      'content' : [null, Validators.compose([Validators.required, Validators.maxLength(3000)])]
    });
    this.dedicatoriaForm = new FormControl();
    this.dedicatoriaForm.setValidators(Validators.compose([Validators.required, Validators.email]));
  }

  ngOnInit() {

  }

  newFriend(event){
    if(event.value && this.friends.indexOf(event.value)==-1){
      this.friends.push(event.value);
    }
    event.value="";
  }

  deleteFriend(event){
    this.friends.splice(this.friends.indexOf(event),1)
  }

  newDedicatoria(event){
    if(this.dedicatoriaForm.valid){
      this.dedicatorias.push(event.target.value);
      event.target.value="";
    }else{
      this.alert.error("Escribe una dirección de email correcta");
    }

  }

  deleteDedicatoria(event){
    this.dedicatorias.splice(this.dedicatorias.indexOf(event),1);
  }

  changeImage(event){
    this.relato.imagen_url=event;
  }

  publish(){
    if(this.complexForm.valid){
      console.log(this.relato);
    }else{
      this.alert.error('Faltan campos por rellenar');
      this.complexForm.controls['title'].markAsTouched();
      this.complexForm.controls['content'].markAsTouched();
    }
  }
}
