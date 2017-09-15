import { Component, OnInit } from '@angular/core';
import { Wall } from '../../models/wall';
import { RepositorioService } from '../../services/repositorio.service';

import { Categoria } from '../../models/cats';

@Component({
  selector: 'app-card-wall-relevante',
  templateUrl: './card-wall-relevante.component.html',
  styleUrls: ['./card-wall-relevante.component.scss']
})
export class CardWallRelevanteComponent implements OnInit {
  walls: Array<Wall> = new Array<Wall>();
  wall1: Wall;
  wall2: Wall;
  wall3: Wall;

  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {
    this.wall1 = new Wall();
    this.wall1.titulo = "Mercenario del tiempo";
    this.wall1.cat = this.repositorio.categoriasAL[0];
    this.wall1.participantes = 22;
    this.wall1.historias = 8;
    this.wall1.visible = true;
    this.wall1.isRelevante = true;

    this.wall2 = new Wall();
    this.wall2.titulo = "El amante secreto";
    this.wall2.cat = this.repositorio.categoriasAL[6];
    this.wall2.participantes = 24;
    this.wall2.historias = 6;
    this.wall2.isRelevante = true;


    this.wall3 = new Wall();
    this.wall3.titulo = "Los molinos de viento";
    this.wall3.cat = this.repositorio.categoriasAL[4];
    this.wall3.participantes = 27;
    this.wall3.historias = 12;
    this.wall3.isRelevante = true;


    this.walls.push(this.wall1);
    this.walls.push(this.wall2);
    this.walls.push(this.wall3);

    setInterval(this.showAnother.bind(this), 30000,);

  }

  ngAfterViewInit() {

  }


  showAnother() {
    let wall = this.walls[0];
    this.walls.splice(0,1);
    this.walls.push(wall);

  }

  participar(wall) {
    //this.router.navigate(['/chatstory/'+chatstory.id]);
  }

  getBorder(wall: Wall) {
    return 'solid 1.5px ' + wall.cat.color;

  }

  getColor(wall: Wall) {
    return wall.cat.color;

  }

}
