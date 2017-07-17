import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {
  @Output() canceled: EventEmitter<any>;
  @Output() verified: EventEmitter<any>;

  constructor() {
    this.canceled = new EventEmitter<any>();
    this.verified = new EventEmitter<any>();
   }

  ngOnInit() {
  }

  verify(){
    this.verified.emit();
  }

  cancel(){
    this.canceled.emit();
  }

}
