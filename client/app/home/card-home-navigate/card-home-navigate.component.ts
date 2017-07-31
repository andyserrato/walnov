import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-home-navigate',
  templateUrl: './card-home-navigate.component.html',
  styleUrls: ['./card-home-navigate.component.scss']
})
export class CardHomeNavigateComponent implements OnInit {
  @Input() view: string;
  @Output() viewChange: EventEmitter<any>;
  constructor() {
    this.viewChange=new EventEmitter<any>();
  }

  ngOnInit() {
    this.view='reciente';
  }

  changeView(str){
    this.view=str;
    this.viewChange.emit(this.view);
  }

}
