import { Component, OnInit } from '@angular/core';
import {RepositorioService} from '../../services/repositorio.service';
import {UserService} from '../../services/user.service';
@Component({
  selector: 'app-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrls: ['./user-followers.component.scss']
})
export class UserFollowersComponent implements OnInit {
  user: any;
  skip = 0;
  constructor(private repo: RepositorioService,
              private userService: UserService) {
  }

  ngOnInit() {
    const myParams = new URLSearchParams();
    myParams.append('top', '12');
    myParams.append('skip', this.skip + '');
    this.userService.getFollowersById(this.repo.idUsuario, myParams).subscribe(user => {
      this.user = user;
    });
  }

}
