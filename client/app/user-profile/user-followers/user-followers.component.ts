import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {RepositorioService} from '../../services/repositorio.service';
import {UserService} from '../../services/user.service';
import {TranslateService} from '../../translate/translate.service';
import {Paginator} from '../../models/paginador';
@Component({
  selector: 'app-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrls: ['./user-followers.component.scss']
})
export class UserFollowersComponent implements OnInit {
  user: any;
  paginador: Paginator;
  @ViewChild('container') container: ElementRef;
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
    myParams.append('top', '15');
    myParams.append('skip', this.skip + '');
    this.userService.getFollowersById(this.repo.idUsuario, myParams).subscribe(user => {
      this.user = user;
      this.paginador = new Paginator(user.seguidores,this.container,12,6);
      if (this.user && (this.user.seguidores.length === 0)) {
        this.showNoContent();
      }
    });
  }

}
