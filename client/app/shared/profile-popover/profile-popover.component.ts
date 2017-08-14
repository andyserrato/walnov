import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class ProfilePopoverComponent implements OnInit {
  visible: boolean = false;
  @ViewChild('div') div: ElementRef;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClick(event) {
    if (!this.div.nativeElement.contains(event.target) && this.visible) {
      this.visible = false;
    }
  }

  logout() {
    this.goTo('');
  }

  close() {
    this.visible = false;
  }

  goTo(route: string) {
    this.close();
    this.router.navigateByUrl(route);
  }

}
