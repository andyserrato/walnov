import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-nuevo-user',
  templateUrl: './nuevo-user.component.html',
  styleUrls: ['./nuevo-user.component.scss']
})
export class NuevoUserComponent implements OnInit {
  users: Array<Usuario>;
  constructor() {
    this.users = new Array<Usuario>();
    for(let i = 0; i< 10; i++) {
        let user = new Usuario();
        user.nombre = "Juan "+i;
        user.walls = 88;
        user.chatstories = 88;
        user.relatos = 88;
        user.imagen = "http://www.lorempixel.com/1200/1600";
        user.seguido = true;
        this.users.push(user);
    }
  }

  ngOnInit() {
  }

}
