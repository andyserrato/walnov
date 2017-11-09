import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-card-follow-user',
  templateUrl: './card-follow-user.component.html',
  styleUrls: ['./card-follow-user.component.scss']
})
export class CardFollowUserComponent implements OnInit {
  @Input() user: any;
  @Input() seguido: boolean;
  invisible: boolean;
  @Output() followClick: EventEmitter<any>;
  constructor(private router: Router,
              private auth: AuthenticationService,
              private userService: UserService) {
    this.followClick = new EventEmitter<any>();
  }

  ngOnInit() {
    // console.log(this.auth.getUser());
    // console.log('user: ' + this.auth.getUser().id);
    // console.log(this.user.id);
    if (this.auth.isLoggedIn() && this.auth.getUser().siguiendo.indexOf(this.user.id) > -1) {
      this.seguido = true;
      this.invisible = this.user.id === this.auth.getUser().id;
    } else {
      this.seguido = false;
      this.invisible = false;
    }

  }

  follow() {
    this.followClick.emit();
    this.userService.follow(this.auth.getUser().id, this.user.id).subscribe(res => {
      this.auth.revalidateUser();
      // console.log(res);
      this.seguido = true;
    });
  }

  goToUser() {
    this.router.navigateByUrl('/user-profile/' + this.user.id + '/walls');
  }

  unfollow() {
    this.userService.unFollow(this.auth.getUser().id, this.user.id).subscribe(res => {
      // console.log(res);
      this.seguido = false;
      this.auth.revalidateUser();
    });
  }

}
