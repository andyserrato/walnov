import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-no-content',
  templateUrl: './no-content.component.html',
  styleUrls: ['./no-content.component.scss']
})
export class NoContentComponent implements OnInit {
  @Input() message: any;
  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.message);
  }

  navigate() {
    this.router.navigate([this.message.enlace]);
  }

}
