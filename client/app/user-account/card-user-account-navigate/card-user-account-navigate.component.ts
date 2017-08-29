import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-user-account-navigate',
  templateUrl: './card-user-account-navigate.component.html',
  styleUrls: ['./card-user-account-navigate.component.scss']
})
export class CardUserAccountNavigateComponent implements OnInit {
  @Input() view: string;
  @Output() changeView: EventEmitter<string>;
  constructor(private route: ActivatedRoute, private router: Router) {
    // this.view = 'datos';
    this.changeView = new EventEmitter<string>();
  }

  clickView(str: string){
    this.view=str;
    this.router.navigate(['/user-account/'+str]);
  }

  ngOnInit() {
  }

}
