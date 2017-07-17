import { Component, OnInit } from '@angular/core';

import { wallRelevante } from '../../models/wallRelevante.model'
import { Categoria } from '../../models/cats';

@Component({
  selector: 'app-card-wall-relevante',
  templateUrl: './card-wall-relevante.component.html',
  styleUrls: ['./card-wall-relevante.component.scss']
})
export class CardWallRelevanteComponent implements OnInit {
  walls: Array<wallRelevante> = new Array<wallRelevante>();
  wall1: wallRelevante;
  wall2: wallRelevante;
  wall3: wallRelevante;

  constructor() { }

  ngOnInit() {
    this.wall1 = new wallRelevante();
    this.wall1.titulo = "Mercenario del tiempo";
    this.wall1.categoria = Categoria.Accion;
    this.wall1.participantes = 22;
    this.wall1.historias = 8;
    this.wall1.visible = true;

    this.wall2 = new wallRelevante();
    this.wall2.titulo = "El amante secreto";
    this.wall2.categoria = Categoria.Fan;
    this.wall2.participantes = 24;
    this.wall2.historias = 6;

    this.wall3 = new wallRelevante();
    this.wall3.titulo = "Los molinos de viento";
    this.wall3.categoria = Categoria.Romance;
    this.wall3.participantes = 27;
    this.wall3.historias = 12;

    this.addWall(this.wall1);
    this.addWall(this.wall2);
    this.addWall(this.wall3);

  }

  ngAfterViewInit() {

  }

  addWall(newWall: wallRelevante) {
    if (newWall) {
        this.walls.push(newWall);
    }

  }

  deleteWall(oldWall: wallRelevante){
    this.walls.splice(this.walls.indexOf(oldWall), 1);

  }

  showAnother(previousWall: wallRelevante) {
    previousWall.visible = false;
    var position = this.walls.indexOf(previousWall);
    if(position === (this.walls.length - 1)) position = -1;
    this.walls[position + 1].visible = true;

  }

  getBorder(wall: wallRelevante) {
    return 'solid 1.2px ' + wall.categoria.color;

  }

  getColor(wall: wallRelevante) {
    return wall.categoria.color;

  }

}
