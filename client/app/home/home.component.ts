import { Component, OnInit} from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  name: string = 'hola';

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  //   this.loadAllUsers();
  } 

  deleteUser(_id: string) {
    this.userService.delete(_id).subscribe(() => { this.loadAllUsers(); });
  }

  private loadAllUsers() {
    console.log('Obteniendo todos los usuarios');
    this.userService.getAll().subscribe(users => { this.users = users; });
  }

}
