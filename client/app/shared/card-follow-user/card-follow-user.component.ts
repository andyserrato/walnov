import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
@Component({
  selector: 'app-card-follow-user',
  templateUrl: './card-follow-user.component.html',
  styleUrls: ['./card-follow-user.component.scss']
})
export class CardFollowUserComponent implements OnInit {
  @Input() user: Usuario;
  seguido: boolean;
  constructor() { }

  ngOnInit() {
  }

}
