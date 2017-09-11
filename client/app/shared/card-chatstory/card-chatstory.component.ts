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
import { RegisterPopoverService } from '../../services/register-popover.service';
import { BibliotecaService } from '../../services/biblioteca.service';
import { TranslateService } from '../../translate/translate.service';
@Component({
  selector: 'app-card-chatstory',
  templateUrl: './card-chatstory.component.html',
  styleUrls: ['./card-chatstory.component.scss']
})
export class CardChatstoryComponent implements OnInit {
  @ViewChild('addButton') addButton: ElementRef;
  @ViewChild('likeButton') likeButton: ElementRef;
  @Input() chatstory: any;
  @Input() allowLibrary: boolean = true;
  inLibrary: boolean = false;
  constructor(private repositorio: RepositorioService,
              private router: Router,
              private auth: AuthenticationService,
              private chatstoryService: ChatstoryService,
              private poopoverService: RegisterPopoverService,
              private bibliotecaService: BibliotecaService,
              private translate: TranslateService) { }

  ngOnInit() {

  }

  checkLibrary() {
    this.inLibrary=this.bibliotecaService.getCurrentBiblioteca().chatStories.indexOf(this.chatstory.id)>-1;
  }

  updateLibrary() {
    this.bibliotecaService.getBibliotecaByCurrentUserId().subscribe(biblioteca => {
      this.bibliotecaService.updateBiblioteca(biblioteca);
      this.checkLibrary();
    });
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
    if(this.addButton){
      if(!this.addButton.nativeElement.contains(event.target) && !this.likeButton.nativeElement.contains(event.target)) {
        this.router.navigate(['/chatstory/'+this.chatstory.id]);
      }
    }else{
      if(!this.likeButton.nativeElement.contains(event.target)) {
        this.router.navigate(['/chatstory/'+this.chatstory.id]);
      }
    }

  }

  like() {
    if(this.auth.isLoggedIn()) {
      this.chatstoryService.likeChatstory(this.chatstory.id, this.auth.getUser().id).subscribe((estadistica) => {
        this.chatstory.estadistica = estadistica;
      });
    } else {
      this.poopoverService.setVisible(true);
    }

 }

 addToLibrary() {
   if(!this.inLibrary) {
     console.log('hola');
     this.bibliotecaService.addChatStoryOnBibliotecaByUserId(this.chatstory.id).subscribe(res => {
       this.updateLibrary()
     });
    //  this.bibliotecaService.updateBiblioteca();
  }else{
    this.bibliotecaService.deleteChatStoryOnBibliotecaByUserId(this.chatstory.id).subscribe(res => {
      this.updateLibrary();
    });
  }

 }

 addLibraryText() {
   if(this.inLibrary){
     return this.translate.translate('chatstorie_added_biblioteca');
   } else {
     return this.translate.translate('chatstorie_add_biblioteca');
   }
 }

  getNumber(numero: number) {
    if (numero >= 1000) {
      return '+' + Math.round(numero / 1000) + 'K';
    }
    return numero;
  }

  liked(){
      if(this.chatstory.estadistica && this.chatstory.estadistica.likers && this.auth.isLoggedIn()){
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
    if (!this.chatstory.descripcion) {
      this.chatstory.descripcion = 'Este chatstory no tiene ninguna descripción.';
    }
    return this.chatstory.descripcion;
  }

  getBackgroundImage() {
    return 'linear-gradient(to bottom,' + this.repositorio.categoriasHM.get(this.chatstory.categoria).opacidad + ',' + this.repositorio.categoriasHM.get(this.chatstory.categoria).color + ')';
  }

  goToUser() {
    this.router.navigateByUrl('user-profile/'+this.chatstory.autor.id);
  }
}
