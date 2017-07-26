import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatStory } from '../chatstory.model';
import { RepositorioService } from '../../services/repositorio.service';
import { ChatstoryMessage } from '../../models/chatstory-message';
import { Paginator } from '../../models/paginador';

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
  @Input() chatStory: ChatStory;
  messagesArray: Array<ChatstoryMessage> = new Array<ChatstoryMessage>();
  lastclick: number=Date.now();
  limite: number=50;
  paginador: Paginator;

  constructor(private repositorio: RepositorioService) {

  }

  ngOnInit() {
    this.chatStory= new ChatStory('hola',['hola'],this.repositorio.categorias[0], [],'https://www.lorempixel.com/1600/1200',"Hola que tal estamos por aquí?");
    for(var i = 0; i < 60; i++){
      this.chatStory.messages.push(new ChatstoryMessage('juan','hola'+i));
    }
    this.paginador = new Paginator(new Array<ChatstoryMessage>(), this.previewScroll, 10,3);
    this.nextMessage();
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
        this.scrollToBottom();
  }

  scrollToBottom(): void {
      // try {
      //     this.previewScroll.nativeElement.scrollTop = this.previewScroll.nativeElement.scrollHeight;
      // } catch(err) { }
  }

  nextMessage(){

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    // if(this.paginador.paginador[this.messagesArray.length]){
    //     this.messagesArray.push(this.chatStory.messages[this.paginador.paginador.length])
    // }


    // this.paginador = new Paginator(this.messagesArray, this.previewScroll, 10,1);
  }

  released(event){
      this.clickBox.nativeElement.style.backgroundColor="rgba(0,0,0,0.50)";
      this.clickBox.nativeElement.innerHTML = "Haz clic en esta zona para ver más o pulsa  la barra espaciadora";
      this.limite=50;
  }

  nextMessageSpace(event){
    if(this.limite==1000){
      this.clickBox.nativeElement.style.backgroundColor="rgba(0,0,0,0.15)";
      this.clickBox.nativeElement.innerHTML = "<span class='fa fa-play-circle fa-2x'></span>";
    }
    var time = Date.now();
    if(event.key === " "){
      if((time-this.lastclick)>this.limite){
        this.nextMessage();
        this.lastclick=time;

      }else{

        this.limite=1000;
      }
    }

  }

}
