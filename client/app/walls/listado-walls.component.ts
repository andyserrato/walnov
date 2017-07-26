import { Component} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MiniaturaWall } from './miniatura-wall.component';

@Component({
  selector: 'listado-walls',
  template: `

  <div class="row">
      <div class="col-lg-2">
          <!-- Aqui van las categorias -->
      </div>

      <div class="col-lg-10">
          <div style="display: flex; flex-wrap: wrap;">
              <miniatura-wall *ngFor="let wall of walls;" [wall]="wall"></miniatura-wall>
          </div>
      </div>
  </div>
  `,
  styleUrls: ['./listado-walls.component.scss']
})

export class ListadoWalls {

      walls:Array<Object>;

      constructor() {
          this.walls = new Array();

          this.walls.push({urlImagen:"https://lorempixel.com/757/200/", titulo:"Esto es un titulo", categoria:"Acción", texto:"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ", numeroHistorias: 10});
          this.walls.push({urlImagen:"https://lorempixel.com/757/200/",titulo:"Esto es un titulo", categoria:"Romance", texto:"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ", numeroHistorias: 10});
          this.walls.push({urlImagen:"https://lorempixel.com/757/200/",titulo:"Esto es un titulo", categoria:"Terror", texto:"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ", numeroHistorias: 10});
          this.walls.push({urlImagen:"https://lorempixel.com/757/200/", titulo:"Esto es un titulo", categoria:"Aventura", texto:"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ", numeroHistorias: 10});
          this.walls.push({urlImagen:"https://lorempixel.com/757/200/",titulo:"Esto es un titulo", categoria:"SCI-FI", texto:"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ", numeroHistorias: 10});
          this.walls.push({urlImagen:"https://lorempixel.com/757/200/", titulo:"Esto es un titulo", categoria:"FanFiction", texto:"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ", numeroHistorias: 10});
          this.walls.push({urlImagen:"https://lorempixel.com/757/200/", titulo:"Esto es un titulo", categoria:"Reflexión", texto:"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ", numeroHistorias: 10});
          this.walls.push({urlImagen:"https://lorempixel.com/757/200/", titulo:"Esto es un titulo", categoria:"Poesía", texto:"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ", numeroHistorias: 10});
          this.walls.push({urlImagen:"https://lorempixel.com/757/200/", titulo:"Esto es un titulo", categoria:"Humor", texto:"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ", numeroHistorias: 10});
      }

      ngOnInit() {

      }

}
