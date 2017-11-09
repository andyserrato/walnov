import { Component, OnInit } from '@angular/core';
import {RepositorioService} from '../../services/repositorio.service';
import {UserService} from '../../services/user.service';
import {TranslateService} from '../../translate/translate.service';
@Component({
  selector: 'app-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrls: ['./user-followers.component.scss']
})
export class UserFollowersComponent implements OnInit {
  user: any;
  skip = 0;
  noContent = false;
  message: any;
  constructor(private repo: RepositorioService,
              private userService: UserService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.loadUserfolowers();
  }

  showNoContent() {
    this.noContent = true;
    this.message = { text: this.translate.instant('shared_no_content_followers'), enlace: ''};
  }

  loadUserfolowers() {
    const myParams = new URLSearchParams();
    myParams.append('top', '12');
    myParams.append('skip', this.skip + '');
    this.userService.getFollowersById(this.repo.idUsuario, myParams).subscribe(user => {
      this.user = user;
      if (this.user && (this.user.seguidores.length === 0)) {
        this.showNoContent();
      }
    });
  }

}
