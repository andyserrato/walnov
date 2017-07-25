import { Component, OnInit, Input } from '@angular/core';
export class ChatstoryMessage{
  character: string;
  text: string;
  image_url: string;
  constructor(c?: string, t?: string, i?:string){
    this.character=c;
    this.text=t;
    this.image_url=i;
  }

}
@Component({
  selector: 'app-chatstory-message',
  templateUrl: './chatstory-message.component.html',
  styleUrls: ['./chatstory-message.component.scss']
})
export class ChatstoryMessageComponent implements OnInit {
  @Input() message: ChatstoryMessage;
  constructor() { }

  ngOnInit() {
  }

}
