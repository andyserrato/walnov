import { Component, OnInit, Input } from '@angular/core';
import { RepositorioService } from '../../services/repositorio.service';
import { ChatStory } from '../../models/chatstory.model';
import { AuthenticationService } from '../../services/authentication.service';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { ChatstoryService } from '../../services/chatstory.service';
import {UserService} from "../../services/user.service";
import {AlertService} from "../../services/alert.service";
import {RegisterPopoverService} from "../../services/register-popover.service";

@Component({
  selector: 'app-card-info-chatstory',
  templateUrl: './card-info-chatstory.component.html',
  styleUrls: ['./card-info-chatstory.component.scss']
})
export class CardInfoChatstoryComponent implements OnInit {
  @Input() chatstory: any;
  constructor(private repositorio: RepositorioService,
              private auth: AuthenticationService,
              private router: Router,
              private userService: UserService,
              private alert: AlertService,
              private popOverService: RegisterPopoverService) {
  }

  ngOnInit() {
  }

  getBorder() {
    return 'solid 1.5px ' + this.repositorio.categoriasHM.get(this.chatstory.categoria.nombre).color;

  }

  getColor() {
    return this.chatstory.categoria.color;

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
    this.router.navigateByUrl('user-profile/' + this.chatstory.autor.id + '/chatstories');
  }

  checkUser() {
    if (this.auth.getUser() && this.chatstory && this.chatstory.autor) {
      return this.chatstory.autor.id === this.auth.getUser().id;
    } else {
      return false;
    }
  }

  follow() {
    if (this.auth.isLoggedIn() && this.chatstory && this.chatstory.autor) {
      this.userService.follow(this.auth.getUser().id, this.chatstory.autor.id).subscribe(
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
    if (this.auth.isLoggedIn() && this.chatstory && this.chatstory.autor) {
      this.userService.unFollow(this.auth.getUser().id, this.chatstory.autor.id).subscribe(
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

  isAlreadyFollowed() {
    if (this.auth.isLoggedIn() && this.chatstory && this.chatstory.autor) {
      return this.auth.getUser().siguiendo.indexOf(this.chatstory.autor.id) !== -1;
    } else {
      return false;
    }
  }

}
