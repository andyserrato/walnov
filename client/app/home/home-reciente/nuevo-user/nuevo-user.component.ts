import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { AlertService } from '../../../services/alert.service';
import { ModalService } from '../../../services/modal.service';
import { TranslateService } from '../../../translate';
// import { TranslatePipe } from '../../../translate';
@Component({
  selector: 'app-nuevo-user',
  templateUrl: './nuevo-user.component.html',
  styleUrls: ['./nuevo-user.component.scss']
})
export class NuevoUserComponent implements OnInit {
  users: Array<Usuario>;
  seguidos: number;
  constructor(private alert: AlertService, private modal: ModalService, private translate: TranslateService) {
    this.seguidos=10;
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

  continue(){
    if(this.seguidos<5) {
      this.alert.error(this.translate.instant('alert_home'));
    }else {
      this.modal.info(this.translate.instant('modal_home'));
    }
  }

  unfollow(user: Usuario) {
    this.seguidos--;
    user.seguido = false;
    if(this.seguidos<5) {
      this.alert.warning(this.translate.instant('alert_home'));
    }
  }

  follow(user: Usuario) {
    this.seguidos++;
    user.seguido = true;
  }

}
