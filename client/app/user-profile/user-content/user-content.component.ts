import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { RepositorioService } from '../../services/repositorio.service';


@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.scss']
})
export class UserContentComponent implements OnInit {
  user:any;
  constructor(private repositorio: RepositorioService, private userService: UserService, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //console.log(params['id']);
      this.userService.getById(params['id']).subscribe(user => {
        this.user = user;
        this.repositorio.idUsuario = this.user.id;
      });
    });
  }

  changeView(str: string){
    let ruta = '/user-profile/'+this.user.id+'/'+str;
    this.router.navigateByUrl(ruta);

  }

}
