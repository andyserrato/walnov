import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-card-usuario-tendencia',
  templateUrl: './card-usuario-tendencia.component.html',
  styleUrls: ['./card-usuario-tendencia.component.scss']
})
export class CardUsuarioTendenciaComponent implements OnInit {
  users: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.users = new Array();
    this.userService.getById('59a598b35e81354778a3df68').subscribe(user => {
      this.users.push(user);
    });
    this.userService.getById('599ee5c7ee4e5821c0c8d657').subscribe(user => {
      this.users.push(user);
    });
    this.userService.getById('599ee8bcc631fe2fd4ea570f').subscribe(user => {
      this.users.push(user);
    });

    setInterval(this.showAnother.bind(this), 30000,);

  }

  ngAfterViewInit() {

  }

  showAnother() {
    let user = this.users[0];
    this.users.splice(0,1);
    this.users.push(user);

  }

  goToUser(user) {
    this.router.navigateByUrl('user-profile/'+user.id+'/walls');
  }

}
