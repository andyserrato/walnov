import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
@Component({
  selector: 'app-card-follow-user',
  templateUrl: './card-follow-user.component.html',
  styleUrls: ['./card-follow-user.component.scss']
})
export class CardFollowUserComponent implements OnInit {
  @Input() user: Usuario;
  @Input() seguido: boolean;
  @Output() followClick : EventEmitter<any>;
  constructor() {
    this.followClick = new EventEmitter<any>();
  }

  ngOnInit() {

  }

  follow() {
    this.followClick.emit();
  }

}
