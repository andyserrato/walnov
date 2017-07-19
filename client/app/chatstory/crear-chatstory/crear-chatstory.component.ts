import { Component, OnInit } from '@angular/core';
import { ChatStory } from '../chatstory.model';
@Component({
  selector: 'app-crear-chatstory',
  templateUrl: './crear-chatstory.component.html',
  styleUrls: ['./crear-chatstory.component.scss']
})
export class CrearChatstoryComponent implements OnInit {
  view: string;
  chatStory: ChatStory;
  constructor() {
      this.view="step1";
      this.chatStory = new ChatStory();
  }

  ngOnInit() {
  }

  changeView(str: string, chatstory: ChatStory){
    this.chatStory=chatstory;
    this.view=str;
  }

}
