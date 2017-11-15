import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-guardado',
  templateUrl: './home-guardado.component.html',
  styleUrls: ['./home-guardado.component.scss']
})
export class HomeGuardadoComponent implements OnInit {

  // view: string;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.view='walls';
  }

  changeView(str){
    // this.view=str;
    this.router.navigate(['/home/guardado/'+str]);
  }

}
