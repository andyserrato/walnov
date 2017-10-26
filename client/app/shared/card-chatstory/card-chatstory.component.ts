import {Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import {Categoria} from '../../models/cats';
import {Router} from '@angular/router';
import {RepositorioService} from '../../services/repositorio.service';
import {AuthenticationService} from '../../services/authentication.service';
import {ChatstoryService} from '../../services/chatstory.service';
import {ChatStory} from '../../models/chatstory.model';
import {Paginator} from '../../models/paginador';
import {CardMiBibliotecaBuscadorComponent} from '../card-mi-biblioteca-buscador/card-mi-biblioteca-buscador.component';
import {CardChatstoriesPaginadorComponent} from '../card-chatstories-paginador/card-chatstories-paginador.component';
import {RegisterPopoverService} from '../../services/register-popover.service';
import {BibliotecaService} from '../../services/biblioteca.service';
import {TranslateService} from '../../translate/translate.service';

@Component({
  selector: 'app-card-chatstory',
  templateUrl: './card-chatstory.component.html',
  styleUrls: ['./card-chatstory.component.scss']
})
export class CardChatstoryComponent implements OnInit {
  @ViewChild('addButton') addButton: ElementRef;
  @ViewChild('likeButton') likeButton: ElementRef;
  @Input() chatstory: any;
  @Input() allowLibrary = true;
  inLibrary = false;

  constructor(private repositorio: RepositorioService,
              private router: Router,
              private auth: AuthenticationService,
              private chatstoryService: ChatstoryService,
              private poopoverService: RegisterPopoverService,
              private bibliotecaService: BibliotecaService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.checkLibrary();
    } else {
      this.allowLibrary = false;
    }
  }

  checkLibrary() {
    this.inLibrary = this.bibliotecaService.getCurrentBiblioteca().chatStories.find(chat => chat.id === this.chatstory.id) ? true : false;
  }

  checkUserChatstory() {
    if (this.chatstory.autor) {
      return this.auth.isLoggedIn() && this.chatstory.autor.id === this.auth.getUser().id;
    } else {
      return false;
    }
  }

  updateLibrary() {
    this.bibliotecaService.getBibliotecaByCurrentUserId().subscribe(biblioteca => {
      this.bibliotecaService.updateBiblioteca(biblioteca);
      this.checkLibrary();
    });
  }

  getColor() {
    if (this.repositorio.categoriasHM.get(this.chatstory.categoria)) {
      return this.repositorio.categoriasHM.get(this.chatstory.categoria).color;
    } else {
      return 'blue';
    }
  }

  loadChatstory(event) {
    if (this.addButton) {
      if (!this.addButton.nativeElement.contains(event.target) && !this.likeButton.nativeElement.contains(event.target)) {
        this.router.navigate(['/chatstory/' + this.chatstory.id]);
      }
    } else {
      if (!this.likeButton.nativeElement.contains(event.target)) {
        this.router.navigate(['/chatstory/' + this.chatstory.id]);
      }
    }

  }

  like() {
    if (this.auth.isLoggedIn()) {
      this.chatstoryService.likeChatstory(this.chatstory.id, this.auth.getUser().id).subscribe((estadistica) => {
        this.chatstory.estadistica = estadistica;
      });
    } else {
      this.poopoverService.setVisible(true);
    }
  }

  addToLibrary() {
    if (!this.inLibrary) {
      this.bibliotecaService.addChatStoryOnBibliotecaByUserId(this.chatstory.id).subscribe(res => {
        this.updateLibrary();
      });
    } else {
      this.bibliotecaService.deleteChatStoryOnBibliotecaByUserId(this.chatstory.id).subscribe(res => {
        this.updateLibrary();
      });
    }

  }

  addLibraryText() {
    if (this.inLibrary) {
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

  liked() {
    if (this.chatstory.estadistica && this.chatstory.estadistica.likers && this.auth.isLoggedIn()) {
      return this.chatstory.estadistica.likers.indexOf(this.auth.getUser().id) > -1;
    } else {
      return false;
    }
  }

  getBackgroundImage() {
    return 'linear-gradient(to bottom,' + this.repositorio.categoriasHM.get(this.chatstory.categoria).opacidad + ',' +
      this.repositorio.categoriasHM.get(this.chatstory.categoria).color + ')';
  }

  goToUser() {
    this.router.navigateByUrl('user-profile/' + this.chatstory.autor.id + '/chatstories');
  }
}
