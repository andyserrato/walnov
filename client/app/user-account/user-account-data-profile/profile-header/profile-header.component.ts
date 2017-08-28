import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

}
