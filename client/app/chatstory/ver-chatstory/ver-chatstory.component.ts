import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatStory } from '../chatstory.model';
import { RepositorioService } from '../../services/repositorio.service';
import { ChatstoryMessage } from '../../models/chatstory-message';
import { Paginator } from '../../models/paginador';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ChatstoryService} from '../../services/chatstory.service';

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
  messagesArray: Array<ChatstoryMessage> = new Array<ChatstoryMessage>();
  lastclick: number= Date.now();
  limite= 50;
  counter= 0;
  stoped = false;
  autoplay = false;
  timer: any;

  constructor(private repositorio: RepositorioService,
              private router: Router,
              private route: ActivatedRoute,
              private chatstoryService: ChatstoryService) {
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.chatstoryService.getChatStory(params.get('id')))
      .subscribe(chatStory => {
        console.log('estamos dentro del subscribe');
        console.log(chatStory);
        this.chatStory = chatStory;
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
      console.log(this.chatStory);
      if (this.chatStory.chats[this.counter] && !this.stoped) {

        if (this.chatStory.chats[this.counter].delay) {

          this.stoped = true;
          this.messagesArray.push(new ChatstoryMessage(this.chatStory.chats[this.counter].personaje, '', '', true));

          setTimeout(() => {
            this.messagesArray[this.messagesArray.length - 1] = this.chatStory.chats[this.counter];
            this.counter++;
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
      this.clickBox.nativeElement.innerHTML = 'Haz clic en esta zona para ver más o pulsa  la barra espaciadora';
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
        // if(this.subscribe){
        //   this.subscribe.unsubscribe();
        // }
        this.nextMessage();
        this.lastclick = time;
      }else{
        this.limite = 1000;
        this.autoplay = true;
        if (!this.timer){
          this.timer = Observable.timer(1000, 1000).subscribe(() => {
            if (this.autoplay){
              this.nextMessage();
            }
          }); ;
        }
        // this.subscribe = this.timer.subscribe(()=>{
        //   this.nextMessage();
        // });
      }
    }

  }

}
