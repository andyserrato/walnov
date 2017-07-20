import { Component } from '@angular/core';
import { RepositorioService } from './services/repositorio.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private repositorio: RepositorioService){
      //Esto debe de ir en el login del usuario, es decir, una vez haga login
      // var socket = io();
      // console.log("trolola");
      //
      // socket.on('notificacionFeed', function(notificacion){
      //   repositorio.notificaciones.push(notificacion);
      // });
      //
      // repositorio.socket = socket;
      // repositorio.socket.emit('identificacion', {id:"594925553fa21737b09babbd"});
  }

}
