import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatStory } from '../chatstory.model';
@Component({
  selector: 'app-crear-chatstory-step-2',
  templateUrl: './crear-chatstory-step-2.component.html',
  styleUrls: ['./crear-chatstory-step-2.component.scss']
})
export class CrearChatstoryStep2Component implements OnInit {
  @Input() chatStory: ChatStory;
  @Output() back: EventEmitter<any>;
  constructor() {
    this.back = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  getBack(){

    this.back.emit(this.chatStory);
  }

}
