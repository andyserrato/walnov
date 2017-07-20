import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';


@Component({
  selector: 'app-tag-bg',
  templateUrl: './tag-bg.component.html',
  styleUrls: ['./tag-bg.component.scss'],
  animations: [
    trigger("myTrigger", [

    ]),

  ]

})
export class TagBgComponent implements OnInit {
  @Input() tag: string;
  @Input() style: string;

  constructor() { }

  ngOnInit() {
  }

}
