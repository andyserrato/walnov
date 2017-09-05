import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Categoria } from '../../models/cats';
import {Router} from '@angular/router';
import { RepositorioService } from '../../services/repositorio.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ChatstoryService } from '../../services/chatstory.service';
import { ChatStory } from '../../models/chatstory.model';
import { Paginator } from '../../models/paginador';
import { CardMiBibliotecaBuscadorComponent } from '../card-mi-biblioteca-buscador/card-mi-biblioteca-buscador.component';
import { CardChatstoriesPaginadorComponent } from '../card-chatstories-paginador/card-chatstories-paginador.component';

@Component({
  selector: 'app-card-chatstory',
  templateUrl: './card-chatstory.component.html',
  styleUrls: ['./card-chatstory.component.scss']
})
export class CardChatstoryComponent implements OnInit {
  @ViewChild('addButton') addButton: ElementRef;
  @ViewChild('likeButton') likeButton: ElementRef;
  @Input() chatstory: any;

  constructor(private repositorio: RepositorioService,
              private router: Router,
              private auth: AuthenticationService,
              private chatstoryService: ChatstoryService) { }

  ngOnInit() {
    console.log(this.chatstory);
  }

  getColor() {
    // console.log(this.chatstory);
    if(this.repositorio.categoriasHM.get(this.chatstory.categoria)){
      return this.repositorio.categoriasHM.get(this.chatstory.categoria).color;
    }else{
      return 'blue';
    }

    // console.log(this.repositorio.categoriasHM.get(this.chatstory.categoria).color);
    // return this.repositorio.categoriasHM.get(this.chatstory.categoria).color;

  }

  loadChatstory(event) {
    if(!this.addButton.nativeElement.contains(event.target) && !this.likeButton.nativeElement.contains(event.target)) {
      this.router.navigate(['/chatstory/'+this.chatstory.id]);
    }
  }

  like() {
    this.chatstoryService.likeChatstory(this.chatstory.id, this.auth.getUser().id).subscribe(() => {
      this.chatstory.estadistica.likes++;
      this.chatstory.estadistica.likers.push(this.auth.getUser().id);
    });
  }

  getNumber(numero: number) {
    if (numero >= 1000) {
      return '+' + Math.round(numero / 1000) + 'K';
    }
    return numero;

  }

  addBiblioteca() {
    if (!this.chatstory.added) {
      // this.repositorio.chatstories.push(chatstory);
      if (CardChatstoriesPaginadorComponent.firstAdded === 0) {
        CardMiBibliotecaBuscadorComponent.showMessage();
        this.repositorio.paginadorChatstoriesBiblioteca.paginador = [];
      }

      CardChatstoriesPaginadorComponent.firstAdded++;

      if (CardChatstoriesPaginadorComponent.firstAdded === 5) {
        CardMiBibliotecaBuscadorComponent.turnFalse();
      }

      this.chatstory.added = true;
      this.repositorio.paginadorChatstoriesBiblioteca.addItem(this.chatstory);
      // console.log(this.repositorio.paginadorChatstoriesBiblioteca);
    }
  }

  liked(){
    if(this.chatstory.estadistica && this.chatstory.estadistica.likers){
      if(this.chatstory.estadistica.likers.indexOf(this.auth.getUser().id) > -1) {
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }


  }

  checkDescription() {
    if (this.chatstory.descripcion === undefined  || this.chatstory.descripcion.length === 0) {
      this.chatstory.descripcion = 'Este chatstory no tiene ninguna descripción.';
    }
    return this.chatstory.descripcion;
  }

  getBackgroundImage() {
    return 'linear-gradient(to bottom,' + this.repositorio.categoriasHM.get(this.chatstory.categoria).opacidad + ',' + this.repositorio.categoriasHM.get(this.chatstory.categoria).color + ')';
  }
}
