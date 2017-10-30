import { Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {RegisterPopoverService} from '../../services/register-popover.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() userType: string;
  @Input() user: any;
  constructor(private auth: AuthenticationService,
              private userService: UserService,
              private popOverService: RegisterPopoverService,
              private alert: AlertService) { }

  ngOnInit() {
  }

  checkUser() {
    if (this.auth.isLoggedIn() && this.user) {
      return this.auth.isLoggedIn() && this.user.id === this.auth.getUser().id;
    }
  }

  follow() {
    if (this.auth.isLoggedIn() && this.user) {
      this.userService.follow(this.auth.getUser().id, this.user.id).subscribe(
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
    if (this.auth.isLoggedIn() && this.user) {
      this.userService.unFollow(this.auth.getUser().id, this.user.id).subscribe(
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
    if (this.auth.isLoggedIn() && this.user) {
      return this.auth.getUser().siguiendo.indexOf(this.user.id) !== -1;
    } else {
      return false;
    }
  }

}
