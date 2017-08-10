import { Component, OnInit } from '@angular/core';
import { Wall } from "../models/wall";
import { AlertService } from '../services/alert.service';

import { Categoria } from '../models/cats'

@Component({
  selector: 'app-crear-wall',
  templateUrl: './crear-wall.component.html',
  styleUrls: ['./crear-wall.component.scss']
})
export class CrearWallComponent implements OnInit {
  wall: Wall;
  imageSRC: string;
  imgTitle: string;

  categoria: string;
  categorias: Array<Categoria> = new Array<Categoria>();

  constructor(private alertSerive: AlertService) {
    this.wall.tags=new Array<string>();
  }



  ngOnInit() {
    this.categorias.push(new Categoria('Acción','#e65e20'));
    this.categorias.push(new Categoria('Aventura','#29ba6f'));
    this.categorias.push(new Categoria('Ciencia-Ficción','#16d7d3'));
    this.categorias.push(new Categoria('Drama','#e15abe'));
    this.categorias.push(new Categoria('Romance','#de196d'));
    this.categorias.push(new Categoria('FanFiction','#df9c00'));
    this.categorias.push(new Categoria('Poesía','#21b3dd'));
    this.categorias.push(new Categoria('Humor','#b8764e'));
    this.categorias.push(new Categoria('Terror','#4b082e'));
    this.categorias.push(new Categoria('Reflexión','#2074e6'));

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

  onChange($event: any){
    console.log('Select con value cambiado: '+$event.target.value);
    document.getElementById('category-filter').style.backgroundImage = "linear-gradient(to bottom, rgba(0, 0, 0, 0), "+$event.target.value+")"
  }

  focusTitle(){
    document.getElementById('titulo-wall').focus();
  }

  focusOutTitle($event) {
    $event.preventDefault();
    $event.target.blur();
    // remove extra lines
    let text = $event.target.outerText.replace(/(\r\n|\n|\r)/gm,"");
    // do whatever you need with the text
  }

  changeImage(event,imagebox: HTMLElement){
    imagebox.style.backgroundImage= "url('"+event+"')";
  }

}
