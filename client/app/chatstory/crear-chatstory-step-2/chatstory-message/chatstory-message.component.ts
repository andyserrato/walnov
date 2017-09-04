import { Component, OnInit, Input } from '@angular/core';
import { ChatstoryMessage } from '../../../models/chatstory-message';
@Component({
  selector: 'app-chatstory-message',
  templateUrl: './chatstory-message.component.html',
  styleUrls: ['./chatstory-message.component.scss']
})
export class ChatstoryMessageComponent implements OnInit {
  @Input() message: ChatstoryMessage;
  @Input() big = false;
  @Input() editable = false;
  constructor() { }

  ngOnInit() {
  }

}
