import { Component, ChangeDetectorRef } from '@angular/core';
import { RepositorioService } from './services/repositorio.service';
import { TranslateService } from './translate';
import { Router, ActivatedRoute } from '@angular/router';
// import { TranslatePipe } from './translate';
// import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  // innerWidth: number;

  constructor(private route: ActivatedRoute, private router: Router, private repositorio: RepositorioService, private translate: TranslateService, private cdr: ChangeDetectorRef){
      this.detectmob();

      // this.landingMobile();
      // let getWindow = () => {
      //       return window.innerWidth;
      //    };
      //
      // window.onresize = () => {
      //     this.innerWidth = getWindow();
      //     this.cdr.detectChanges(); //running change detection manually
      //     this.landingMobile();
      //     console.log(this.innerWidth);
      //
      // };

      // navigator.userAgent.match
      //Esto debe de ir en el login del usuario, es decir, una vez haga login
      // var socket = io();
      // console.log("trolola");
      // socket.on('notificacionFeed', function(notificacion){
      //   repositorio.notificaciones.push(notificacion);
      // });
      //
      // repositorio.socket = socket;
      // repositorio.socket.emit('identificacion', {id:"594925553fa21737b09babbd"});
  }

  // landingMobile() {
  //   console.log("navegando");
  //   if(this.innerWidth < 768) {
  //     this.router.navigate(['/home/']);
  //   }
  // }

  detectmob() {
     if( navigator.userAgent.match(/Android/i)
     || navigator.userAgent.match(/webOS/i)
     || navigator.userAgent.match(/iPhone/i)
     || navigator.userAgent.match(/iPad/i)
     || navigator.userAgent.match(/iPod/i)
     || navigator.userAgent.match(/BlackBerry/i)
     || navigator.userAgent.match(/Windows Phone/i)
     ){
       this.router.navigate(['descarga-la-app']);
     }
   }


}
