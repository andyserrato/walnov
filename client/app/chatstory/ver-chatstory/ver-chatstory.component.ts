import { Component, OnInit, Input } from '@angular/core';
import { ChatStory } from '../chatstory.model';
import { RepositorioService } from '../../services/repositorio.service';
import { ChatstoryMessage } from '../../models/chatstory-message';

@Component({
  selector: 'app-ver-chatstory',
  templateUrl: './ver-chatstory.component.html',
  styleUrls: ['./ver-chatstory.component.scss'],
  host: {
    '(document:keydown)': 'setTimeout(nextMessageSpace($event), 250m)'
  }
})
export class VerChatstoryComponent implements OnInit {

  @Input() chatStory: ChatStory;
  messagesArray: Array<ChatstoryMessage> = new Array<ChatstoryMessage>();

  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {
    this.chatStory= new ChatStory('hola',['hola'],this.repositorio.categorias[0], [new ChatstoryMessage('juan','hola'),new ChatstoryMessage('juan','hola'),new ChatstoryMessage('juan','hola'),new ChatstoryMessage('juan','hola'),new ChatstoryMessage('juan','hola'),new ChatstoryMessage('juan','hola')],'https://www.lorempixel.com/1600/1200');
    this.nextMessage();
  }

  nextMessage(){
    if(this.chatStory.messages[this.messagesArray.length]){
        this.messagesArray.push(this.chatStory.messages[this.messagesArray.length])
    }
    this.chatStory.messages.push(new ChatstoryMessage('juan','hola'));
  }

  nextMessageSpace(event, enabled: boolean){
    if(event.key === " " && enabled){
      this.nextMessage();
      enabled=false;
      setTimeout(function(){enabled = true;},250);
    }
  }

}
