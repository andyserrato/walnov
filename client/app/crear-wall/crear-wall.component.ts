import { Component, OnInit } from '@angular/core';
import { Wall } from "../models/wall";
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-crear-wall',
  templateUrl: './crear-wall.component.html',
  styleUrls: ['./crear-wall.component.scss']
})
export class CrearWallComponent implements OnInit {
  wall: Wall;
  imageSRC: string;
  imgTitle: string;
  categorias: Array<String>;
  categoria: string;

  constructor(private alertSerive: AlertService) {
    this.categorias = new Array<string>();
    this.categorias.push('Acción');
    this.categorias.push('Aventura');
    this.categorias.push('Ciencia-Ficción');
    this.categorias.push('Drama');
    this.categorias.push('Romance');
    this.categorias.push('FanFiction');
    this.categorias.push('Poesía');
    this.categorias.push('Humor');
    this.categorias.push('Terror');
    this.categorias.push('Reflexión');
  }

  ngOnInit() {

  }

  onSubmit() {

  }

  fileLoad($event :any) {
        let myReader:FileReader = new FileReader();
        let file:File = $event.target.files[0];
        this.imgTitle = file.name;
        myReader.readAsDataURL(file);

        myReader.onload = (e: any) => {
            this.imageSRC = e.target.result;
        }
    }

}
