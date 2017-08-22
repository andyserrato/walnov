import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-user-account-navigate',
  templateUrl: './card-user-account-navigate.component.html',
  styleUrls: ['./card-user-account-navigate.component.scss']
})
export class CardUserAccountNavigateComponent implements OnInit {
  @Input() view: string;
  @Output() changeView: EventEmitter<string>;
  constructor() {
    // this.view = 'datos';
    this.changeView = new EventEmitter<string>();
  }

  clickView(str: string){
    this.changeView.emit(str);
  }

  ngOnInit() {
  }

}
