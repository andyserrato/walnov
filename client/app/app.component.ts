import { Component, ChangeDetectorRef } from '@angular/core';
import { RepositorioService } from './services/repositorio.service';
import { TranslateService } from './translate';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from './services/authentication.service';

// import { TranslatePipe } from './translate';
// import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  innerWidth: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private repositorio: RepositorioService,
              private translate: TranslateService,
              private cdr: ChangeDetectorRef) {
      if (this.detectMob() && this.detectRes()) {
        this.router.navigate(['descarga-la-app']);
      }



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

  detectRes() {
    const getWindow = () => {
          return window.innerWidth;
    };
    this.innerWidth = getWindow();
    if (this.innerWidth < 768) {
      return true;
    } else {
        return false;
    }
  }

  detectMob() {
     if ( navigator.userAgent.match(/Android/i)
     || navigator.userAgent.match(/webOS/i)
     || navigator.userAgent.match(/iPhone/i)
     || navigator.userAgent.match(/iPad/i)
     || navigator.userAgent.match(/iPod/i)
     || navigator.userAgent.match(/BlackBerry/i)
     || navigator.userAgent.match(/Windows Phone/i)
     ) {
       return true;
    } else {
        return false;
    }
   }


}
