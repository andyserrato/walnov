import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { RepositorioService } from '../../services/repositorio.service';
import { AuthenticationService } from '../../services/authentication.service';
import { BibliotecaService } from '../../services/biblioteca.service';
import { ChatstoryMessage } from '../../models/chatstory-message';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ChatstoryService} from '../../services/chatstory.service';
import { TranslateService } from '../../translate';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-ver-chatstory',
  templateUrl: './ver-chatstory.component.html',
  styleUrls: ['./ver-chatstory.component.scss'],
  host: {
    '(document:keydown)': 'nextMessageSpace($event)',
    '(document:keyup)': 'released($event)'
  }
})
export class VerChatstoryComponent implements OnInit, AfterViewChecked {
  @ViewChild('clickBox') clickBox: ElementRef;
  @ViewChild('previewScroll') previewScroll: ElementRef;
  @Input() chatStory: any;
  allowLibrary = true;
  inLibrary = false;

  messagesArray: Array<any> = new Array<any>();
  lastclick: number= Date.now();
  limite= 50;
  counter= 0;
  stoped = false;
  autoplay = false;
  timer: any;
  user: any;
  tipo: string;

  constructor(private repositorio: RepositorioService,
              private router: Router,
              private auth: AuthenticationService,
              private bibliotecaService: BibliotecaService,
              private route: ActivatedRoute,
              private chatstoryService: ChatstoryService,
              private translate: TranslateService,
              private userService: UserService) {


  }

  ngOnInit() {

    if (this.auth.isLoggedIn()) {
      // this.checkLibrary();
      console.log("es esta línea Andy");
    } else {
      this.allowLibrary = false;
    }


    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.chatstoryService.getChatStory(params.get('id')))
      .subscribe(chatStory => {
        this.chatStory = chatStory;
        if (this.repositorio.categoriasHM.get(this.chatStory.categoria)){
          this.chatStory.categoria = this.repositorio.categoriasHM.get(this.chatStory.categoria);
        }else{
          this.chatStory.categoria = this.repositorio.categoriasAL[1];
        };
        switch (this.chatStory.autor.tipo){
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
      });
  }

  ngAfterViewChecked() {
      this.scrollToBottom();
  }

  scrollToBottom(): void {
      try {
          this.previewScroll.nativeElement.scrollTop = this.previewScroll.nativeElement.scrollHeight;
      } catch (err) { }
  }

  checkLibrary() {
      this.inLibrary = this.bibliotecaService.getCurrentBiblioteca().chatStories.find(chat => chat.id === this.chatStory.id) ? true : false;
  }

  checkUserChatstory() {
    if (this.chatStory) {
      return this.auth.isLoggedIn() && this.chatStory.autor.id === this.auth.getUser().id;
    }else {
      return false;
    }
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
   }else{
     this.bibliotecaService.deleteChatStoryOnBibliotecaByUserId(this.chatStory.id).subscribe(res => {
       this.updateLibrary();
     });
   }

  }

  addLibraryText() {
    if (this.inLibrary){
      return this.translate.translate('chatstorie_added_biblioteca');
    } else {
      return this.translate.translate('chatstorie_add_biblioteca');
    }
  }

  checkAllow() {
    if(!this.allowLibrary) return this.allowLibrary;
    else return !this.checkUserChatstory();

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
        }else{
          this.messagesArray.push(this.chatStory.chats[this.counter]);
        }

        if (this.counter >= 20){
          this.messagesArray.shift();
        }
        this.counter++;
      }

  }

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

  nextMessageSpace(event) {
    if (this.autoplay ) {
      this.clickBox.nativeElement.style.backgroundColor = 'rgba(0,0,0,0.15)';
      this.clickBox.nativeElement.innerHTML = '<span class=\'fa fa-play-circle fa-2x\'></span>';
    }
    const time = Date.now();
    if (event.key === ' ' && !this.stoped){
      if ((time - this.lastclick) > this.limite){
        this.autoplay = false;
        if (this.timer){
          this.timer.unsubscribe();
          this.timer = false;
        }

        this.nextMessage();
        this.lastclick = time;
      }else{
        this.limite = 1000;
        this.autoplay = true;
        if (!this.timer){
          this.timer = Observable.timer(1500, 1500).subscribe(() => {
            if (this.autoplay){
              this.nextMessage();
            }
          }); ;
        }
      }
    }

  }

}
