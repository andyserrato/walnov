import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked, HostListener} from '@angular/core';
import {RepositorioService} from '../../services/repositorio.service';
import {AuthenticationService} from '../../services/authentication.service';
import {BibliotecaService} from '../../services/biblioteca.service';
import {ChatstoryMessage} from '../../models/chatstory-message';
import {Observable} from 'rxjs/Rx';
import {ActivatedRoute} from '@angular/router';
import {ChatstoryService} from '../../services/chatstory.service';
import {TranslateService} from '../../translate';
import {ShareButtonsService} from 'ngx-sharebuttons';

@Component({
  selector: 'app-ver-chatstory',
  templateUrl: './ver-chatstory.component.html',
  styleUrls: ['./ver-chatstory.component.scss']
})
export class VerChatstoryComponent implements OnInit, AfterViewChecked {
  @ViewChild('clickBox') clickBox: ElementRef;
  @ViewChild('previewScroll') previewScroll: ElementRef;
  @Input() chatStory: any;
  inLibrary = false;
  allowLibray = false;
  messagesArray: Array<any> = new Array<any>();
  lastclick: number = Date.now();
  limite = 50;
  counter = 0;
  stoped = false;
  autoplay = false;
  timer: any;
  user: any;
  tipo: string;

  constructor(private repositorio: RepositorioService,
              private auth: AuthenticationService,
              private bibliotecaService: BibliotecaService,
              private route: ActivatedRoute,
              private chatstoryService: ChatstoryService,
              private translate: TranslateService,
              public share: ShareButtonsService) {


  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.chatstoryService.getChatStory(params['id'])
        .subscribe(chatStory => {
          this.chatStory = chatStory;
          if (this.repositorio.categoriasHM.get(this.chatStory.categoria)) {
            this.chatStory.categoria = this.repositorio.categoriasHM.get(this.chatStory.categoria);
          } else {
            this.chatStory.categoria = this.repositorio.categoriasAL[1];
          }
          ;
          switch (this.chatStory.autor.tipo) {
            case 0:
              this.tipo = 'normal';
              break;
            case 1:
              this.tipo = 'premium';
              break;
            default:
              this.tipo = 'normal';
              break;
          }
          this.messagesArray = [];
          this.counter = 0;
          this.lastclick = Date.now();
          this.limite = 50;
          this.stoped = false;
          this.nextMessage();
          this.scrollToBottom();
          this.checkLibrary();
          this.showAnyadirToBiblioteca();
        })
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.previewScroll.nativeElement.scrollTop = this.previewScroll.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  showAnyadirToBiblioteca() {
    if (this.auth.isLoggedIn() && (this.bibliotecaService.getCurrentBiblioteca() === null)) {
      this.checkLibrary();
    }

    return this.auth.isLoggedIn();
  }

  checkLibrary() {
    if (this.bibliotecaService.getCurrentBiblioteca() && this.chatStory) {
      this.inLibrary = this.bibliotecaService.getCurrentBiblioteca().chatStories.find(chat => chat === this.chatStory.id) ? true : false;
    } else if (this.auth.isLoggedIn() && this.chatStory) {
      this.bibliotecaService.getBibliotecaByCurrentUserId().subscribe(
        (biblioteca) => {
          this.bibliotecaService.updateBiblioteca(biblioteca);
          this.inLibrary = biblioteca.chatStories.find(chat => chat === this.chatStory.id) ? true : false;
        });
    } else {
      this.inLibrary = false;
    }
  }

  checkUserChatstory() {
    let isUserChatStory = false;

    if (this.chatStory) {
      isUserChatStory = this.auth.isLoggedIn() && this.chatStory.autor.id === this.auth.getUser().id;
    }

    return isUserChatStory;
  }

  updateLibrary() {
    this.bibliotecaService.getBibliotecaByCurrentUserId().subscribe(biblioteca => {
      this.bibliotecaService.updateBiblioteca(biblioteca);
      this.checkLibrary();
    });
  }

  addToLibrary() {
    if (!this.inLibrary) {
      this.bibliotecaService.addChatStoryOnBibliotecaByUserId(this.chatStory.id).subscribe(res => {
        this.updateLibrary();
      });
    } else {
      this.bibliotecaService.deleteChatStoryOnBibliotecaByUserId(this.chatStory.id).subscribe(res => {
        this.updateLibrary();
      });
    }

  }

  addLibraryText() {
    if (this.inLibrary) {
      return this.translate.instant('chatstorie_added_biblioteca');
    } else {
      return this.translate.instant('chatstorie_add_biblioteca');
    }
  }

  nextMessage() {
    if (this.chatStory.chats[this.counter] && !this.stoped) {

      if (this.chatStory.chats[this.counter].delay) {

        this.stoped = true;
        this.messagesArray.push(new ChatstoryMessage(this.chatStory.chats[this.counter].personaje, '', '', true));

        setTimeout(() => {
          this.chatStory.chats[this.counter - 1].delay = false;
          this.messagesArray[this.messagesArray.length - 1] = this.chatStory.chats[this.counter - 1];
          this.limite = 1000;
          this.lastclick = Date.now();
          setTimeout(() => {
            this.stoped = false;
          });
        }, 3000);
      } else {
        this.messagesArray.push(this.chatStory.chats[this.counter]);
      }

      if (this.counter >= 20) {
        this.messagesArray.shift();
      }
      this.counter++;
    }

  }

  @HostListener('document:keyup', ['$event'])
  released(event) {
    if (!this.autoplay) {
      this.clickBox.nativeElement.style.backgroundColor = 'rgba(0,0,0,0.50)';
      this.clickBox.nativeElement.innerHTML = this.translate.instant('chatstories_ver_footer');
      this.limite = 50;
    }

  }

  nextMessageClick() {
    this.autoplay = false;
    this.nextMessage();
  }

  @HostListener('document:keydown', ['$event'])
  nextMessageSpace(event) {
    if (this.autoplay) {
      this.clickBox.nativeElement.style.backgroundColor = 'rgba(0,0,0,0.15)';
      this.clickBox.nativeElement.innerHTML = '<span class=\'fa fa-play-circle fa-2x\'></span>';
    }
    const time = Date.now();
    if (event.key === ' ' && !this.stoped) {
      if ((time - this.lastclick) > this.limite) {
        this.autoplay = false;
        if (this.timer) {
          this.timer.unsubscribe();
          this.timer = false;
        }

        this.nextMessage();
        this.lastclick = time;
      } else {
        this.limite = 1000;
        this.autoplay = true;
        if (!this.timer) {
          this.timer = Observable.timer(1500, 1500).subscribe(() => {
            if (this.autoplay) {
              this.nextMessage();
            }
          });
          ;
        }
      }
    }

  }

  onCompartir(redSocial: string) {
    if (this.auth.isLoggedIn()) {
      this.chatstoryService.updateContadorCompartido(this.chatStory.id, this.auth.getUser().id, redSocial);
    }
  }
}
