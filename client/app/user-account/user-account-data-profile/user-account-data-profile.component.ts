import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-user-account-data-profile',
  templateUrl: './user-account-data-profile.component.html',
  styleUrls: ['./user-account-data-profile.component.scss']
  // encapsulation: ViewEncapsulation.None
})
export class UserAccountDataProfileComponent implements OnInit {
  user:any;
  constructor(private auth: AuthenticationService) {
    this.user = this.auth.getUser();
    console.log(this.user);
  }

  ngOnInit() {
  }

}
