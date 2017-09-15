import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  vista: number;
  tipo: string='normal';
  user: any;
  constructor(private auth: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    this.getRuta();

    console.log(this.vista);
    console.log(this.router.url.includes("relatos"));

    this.route.params.subscribe(params => {
      //console.log(params['id']);
      this.userService.getById(params['id']).subscribe(user => {
        this.user = user;
        switch(user.tipo){
          case 0:
            this.tipo='normal';
            break;
          case 1:
            this.tipo='premium';
            break;
          default:
            this.tipo='normal';
            break;
        }
      });
    });
  }

  getRuta() {
    if(this.router.url.includes("relatos")) this.vista = 0;
    else if (this.router.url.includes("chatstories")) this.vista = 1;
    else this.vista = 2;
  }

}
