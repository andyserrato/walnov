import { Component, OnInit } from '@angular/core';
import { RepositorioService } from '../services/repositorio.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss', '../landing/styles/bootstrap.min.css', '../landing/styles/font-awesome.min.css', '../landing/styles/linearicons.css', '../landing/styles/owl.carousel.css', '../landing/styles/owl.theme.css', '../landing/styles/responsive.css', '../landing/styles/style.css']
})
export class LandingComponent implements OnInit {

  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {
  }

  getBackColor(categoria) {
      return categoria.color;
  }
}
