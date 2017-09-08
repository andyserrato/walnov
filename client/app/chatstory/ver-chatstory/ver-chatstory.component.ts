import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatStory } from '../../models/chatstory.model';
import { RepositorioService } from '../../services/repositorio.service';
import { ChatstoryMessage } from '../../models/chatstory-message';
import { Paginator } from '../../models/paginador';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ChatstoryService} from '../../services/chatstory.service';
import { TranslateService } from '../../translate';

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
  messagesArray: Array<any> = new Array<any>();
  lastclick: number= Date.now();
  limite= 50;
  counter= 0;
  stoped = false;
  autoplay = false;
  timer: any;

  constructor(private repositorio: RepositorioService,
              private router: Router,
              private route: ActivatedRoute,
              private chatstoryService: ChatstoryService,
              private translate : TranslateService) {
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.chatstoryService.getChatStory(params.get('id')))
      .subscribe(chatStory => {
        console.log('estamos dentro del subscribe');

        this.chatStory = chatStory;
        if(this.repositorio.categoriasHM.get(this.chatStory.categoria)){
          this.chatStory.categoria = this.repositorio.categoriasHM.get(this.chatStory.categoria);
        }else{
          this.chatStory.categoria = this.repositorio.categoriasAL[1];
        };
        console.log(this.chatStory);
        this.nextMessage();
        this.scrollToBottom();
      });

    // this.chatStory = new ChatStory('hola', ['hola'], this.repositorio.categoriasAL[0], [], 'https://www.lorempixel.com/1600/1200', 'Hola que tal estamos por aquí?');
    // for (let i = 0; i < 60; i++) {
    //   if (i == 10) {
    //       this.chatStory.chats.push(new ChatstoryMessage('juan', 'hola' + i, '', true));
    //   }
    //   this.chatStory.chats.push(new ChatstoryMessage('juan', 'hola' + i));
    // }
    // this.nextMessage();
    // this.scrollToBottom();
  }

  ngAfterViewChecked() {
      this.scrollToBottom();
  }

  scrollToBottom(): void {
      try {
          this.previewScroll.nativeElement.scrollTop = this.previewScroll.nativeElement.scrollHeight;
      } catch (err) { }
  }



  nextMessage() {
      // console.log(this.chatStory);
      // console.log(this.counter);
      if (this.chatStory.chats[this.counter] && !this.stoped) {

        if (this.chatStory.chats[this.counter].delay) {

          this.stoped = true;
          this.messagesArray.push(new ChatstoryMessage(this.chatStory.chats[this.counter].personaje, '', '', true));

          setTimeout(() => {
            this.chatStory.chats[this.counter-1].delay = false;
            this.messagesArray[this.messagesArray.length - 1] = this.chatStory.chats[this.counter-1];
            this.limite = 1000;
            this.lastclick = Date.now();
            setTimeout(()=>{
              this.stoped = false;
            })
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
