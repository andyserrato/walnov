import { Component, OnInit } from '@angular/core';
import { RepositorioService } from '../services/repositorio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private repositorio: RepositorioService) {

  }

  ngOnInit() {
  }

}
