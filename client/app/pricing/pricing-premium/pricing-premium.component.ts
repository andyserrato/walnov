import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import { RepositorioService } from '../../services/repositorio.service';


@Component({
  selector: 'app-pricing-premium',
  templateUrl: './pricing-premium.component.html',
  styleUrls: ['./pricing-premium.component.scss']
})
export class PricingPremiumComponent implements OnInit {
  // // @ViewChild("capturado") capturado;
  view:string;
  // normal: boolean = true;
  // prueba: boolean = false;
  // planSel: boolean = false;
  // @ViewChild("contenido") contenido: ElementRef;
  // div: any;


  constructor(private router: Router, private repositorio: RepositorioService) {
    this.view = "normal";
  }

  ngOnInit() {
    // this.div = null;
  }

  // capturaPlan(event: any) {
  //   this.div = event;
  //   console.log(this.div);
  // }

  cambiaVista(event: any) {
    this.view = event;
    if(this.view === "prueba") this.router.navigate(['pricing-premium/prueba']);
    if(this.view === "checkout") this.router.navigate(['pricing-premium/confirma-tu-plan']);

    // console.log(this.view);
  }

}
