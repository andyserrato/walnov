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
  constructor(private repo: RepositorioService,
              private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getFollowersById(this.repo.idUsuario).subscribe(user => {
      this.user = user;
      // console.log(user);
    });
    
  }

}
