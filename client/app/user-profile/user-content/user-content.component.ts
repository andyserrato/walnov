import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.scss']
})
export class UserContentComponent implements OnInit {
  view: string
  constructor() {
    this.view = "walls";
  }

  ngOnInit() {
  }

}
