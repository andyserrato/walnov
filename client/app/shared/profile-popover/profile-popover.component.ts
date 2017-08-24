import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {AlertService} from '../../services/alert.service';
@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class ProfilePopoverComponent implements OnInit {
  visible = false;
  @ViewChild('div') div: ElementRef;
  nombre = 'Nombre Usuario';
  constructor(private router: Router, private authenticationService: AuthenticationService,
              private alertService: AlertService) { }

  ngOnInit() {
    if (this.authenticationService.getUser().perfil.display_name) {
      this.nombre = this.authenticationService.getUser().perfil.display_name;
    } else if (this.authenticationService.getUser().login) {
      this.nombre = this.authenticationService.getUser().login;
    }
  }

  onClick(event) {
    if (!this.div.nativeElement.contains(event.target) && this.visible) {
      this.visible = false;
    }
  }

  logout() {
    this.authenticationService.logout().subscribe(
      res => (this.alertService.success('Ha terminado la sesión')),
      error => (this.alertService.error('Ha ocurrido un error '))
    );
    this.alertService.clearTimeOutAlert();
  }

  close() {
    this.visible = false;
  }

  goTo(route: string) {
    this.close();
    this.router.navigateByUrl(route);
  }

}
