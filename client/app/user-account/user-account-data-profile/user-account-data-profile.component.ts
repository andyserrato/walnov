import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { SelectItem } from '../../models/select-item';
@Component({
  selector: 'app-user-account-data-profile',
  templateUrl: './user-account-data-profile.component.html',
  styleUrls: ['./user-account-data-profile.component.scss']
  // encapsulation: ViewEncapsulation.None
})
export class UserAccountDataProfileComponent implements OnInit {
  user:any;
  languages: Array<SelectItem> = new Array<SelectItem>();
  interests: Array<SelectItem> = new Array<SelectItem>();
  constructor(private auth: AuthenticationService,
              private userService: UserService) {
    this.languages.push(new SelectItem('español'));
    this.languages.push(new SelectItem('english'));
    this.languages.push(new SelectItem('frances'));
    this.languages.push(new SelectItem('portugues'));
    this.languages.push(new SelectItem('chino'));
    this.languages.push(new SelectItem('japones'));
    this.languages.push(new SelectItem('italiano'));
    this.languages.push(new SelectItem('ruso'));

    this.interests.push(new SelectItem('deportes'));
    this.interests.push(new SelectItem('cultura'));
    this.interests.push(new SelectItem('historia'));
    this.interests.push(new SelectItem('arte'));
    this.interests.push(new SelectItem('musica'));
    this.interests.push(new SelectItem('viajar'));
    this.interests.push(new SelectItem('fantasia'));
    this.interests.push(new SelectItem('misterio'));
    this.user = this.auth.getUser();
    // console.log(this.user);
  }

  ngOnInit() {

  }

  save() {
    console.log(this.user);
    // this.userService.update(this.user).subscribe(user => {
    //   this.auth.revalidateUser(user);
    //   this.user = this.auth.getUser();
    // });
  }

}
