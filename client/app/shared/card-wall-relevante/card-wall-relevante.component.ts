import { Component, OnInit } from '@angular/core';

import { wallRelevante } from './wallRelevante.model'

@Component({
  selector: 'app-card-wall-relevante',
  templateUrl: './card-wall-relevante.component.html',
  styleUrls: ['./card-wall-relevante.component.scss']
})
export class CardWallRelevanteComponent implements OnInit {
  walls: Array<wallRelevante> = new Array<wallRelevante>();
  wall1: wallRelevante;



  constructor() { }

  ngOnInit() {

    this.wall1 = new wallRelevante();
    this.wall1.titulo = "Mercenario del tiempo";
    this.wall1.categoria = "Acción";
    this.wall1.participantes = 22;
    this.wall1.historias = 8;

    this.addWall(this.wall1);

  }

  addWall(newWall: wallRelevante) {
    if (newWall) {
        this.walls.push(newWall);

    }
  }

  deleteWall(oldWall: wallRelevante){
    this.walls.splice(this.walls.indexOf(oldWall), 1);

  }

}
