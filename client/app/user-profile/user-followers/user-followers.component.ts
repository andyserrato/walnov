import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {RepositorioService} from '../../services/repositorio.service';
import {UserService} from '../../services/user.service';
import { Paginator } from '../../models/paginador';
@Component({
  selector: 'app-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrls: ['./user-followers.component.scss']
})
export class UserFollowersComponent implements OnInit {
  user: any;
  paginador: Paginator;
  @ViewChild('container') container: ElementRef;
  constructor(private repo: RepositorioService,
              private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getFollowersById(this.repo.idUsuario).subscribe(user => {
      console.log(user);
      this.user = user;
      let array = new Array(20);
      this.paginador = new Paginator(array, this.container, 12, 6 );
    });
    
  }

}
