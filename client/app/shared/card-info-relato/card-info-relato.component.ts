import { Component, OnInit, Input } from '@angular/core';
import { RepositorioService } from '../../services/repositorio.service';
import { AuthenticationService } from '../../services/authentication.service';
import 'rxjs/add/operator/switchMap';
import {Router} from '@angular/router';
import {RegisterPopoverService} from '../../services/register-popover.service';
import {UserService} from '../../services/user.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-card-info-relato',
  templateUrl: './card-info-relato.component.html',
  styleUrls: ['./card-info-relato.component.scss']
})
export class CardInfoRelatoComponent implements OnInit {
  @Input() relato: any;
  constructor(private repositorio: RepositorioService,
              private auth: AuthenticationService,
              private router: Router,
              private popOverService: RegisterPopoverService,
              private userService: UserService,
              private alert: AlertService) {
  }

  ngOnInit() {
  }

  getBorder() {
    return 'solid 1.5px ' + this.repositorio.categoriasHM.get(this.relato.categoria.nombre).color;
  }

  getColor() {
    return this.relato.categoria.color;
  }

  formatearNumero(nStr) {
    nStr += '';
    const x = nStr.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? ',' + x[1] : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
  }

  goToUser() {
    this.router.navigateByUrl('user-profile/' + this.relato.autor.id + '/relatos');
  }

  checkUser() {
    if (this.relato.autor) {
      return this.auth.isLoggedIn() && this.relato.autor.id === this.auth.getUser().id;
    }
  }

  isAlreadyFollowed() {
    if (this.auth.isLoggedIn() && this.relato && this.relato.autor) {
      return this.auth.getUser().siguiendo.indexOf(this.relato.autor.id) !== -1;
    } else {
      return false;
    }
  }

  follow() {
    if (this.auth.isLoggedIn() && this.relato && this.relato.autor) {
      this.userService.follow(this.auth.getUser().id, this.relato.autor.id).subscribe(
        (mensaje) => {
          this.auth.revalidateUser();
          this.alert.success(mensaje);
          },
        (error) => this.alert.error(error)
        );
    } else {
      this.popOverService.setVisible(true);
    }
  }

  unFollow() {
    if (this.auth.isLoggedIn() && this.relato && this.relato.autor) {
      this.userService.unFollow(this.auth.getUser().id, this.relato.autor.id).subscribe(
        (mensaje) => {
          this.auth.revalidateUser();
          this.alert.success(mensaje);
        },
        (error) => this.alert.error(error)
      );
    } else {
      this.popOverService.setVisible(true);
    }
  }


}
