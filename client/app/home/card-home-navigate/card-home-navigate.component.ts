import { Component, OnInit, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-home-navigate',
  templateUrl: './card-home-navigate.component.html',
  styleUrls: ['./card-home-navigate.component.scss']
})
export class CardHomeNavigateComponent implements OnInit {
  // @Input() view: string;

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {

  }

  changeView(str: string){
    // this.view=str;
    this.router.navigate(['/home/'+str]);

  }

}
