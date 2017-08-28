import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
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
  constructor(private auth: AuthenticationService) {
    this.languages.push(new SelectItem('Español'));
    this.languages.push(new SelectItem('Inglés'));
    this.languages.push(new SelectItem('Francés'));
    this.languages.push(new SelectItem('Portugués'));
    this.languages.push(new SelectItem('Chino'));
    this.languages.push(new SelectItem('Japonés'));
    this.languages.push(new SelectItem('Italiano'));
    this.languages.push(new SelectItem('Ruso'));

    this.interests.push(new SelectItem('Deportes'));
    this.interests.push(new SelectItem('Cultura'));
    this.interests.push(new SelectItem('Historia'));
    this.interests.push(new SelectItem('Arte'));
    this.interests.push(new SelectItem('Música'));
    this.interests.push(new SelectItem('Viajar'));
    this.interests.push(new SelectItem('Fantasía'));
    this.interests.push(new SelectItem('Misterio'));
    this.user = this.auth.getUser();
    console.log(this.user);
  }

  ngOnInit() {
  }

}
