import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-informativo',
  templateUrl: './card-informativo.component.html',
  styleUrls: ['./card-informativo.component.scss']
})
export class CardInformativoComponent implements OnInit {
  showCard = true;
  showButton: boolean;
  buttonText: string;
  titulo: string;
  parrafos: Array<string>;
  @Input() view: string;
  @Input() cats: any;

  constructor() {
    // de forma momentánea pues no
  }

  ngOnInit() {
    this.showButton = true;
    this.buttonText = 'Entendido';
    this.parrafos = new Array<string>();

    if(this.view.includes("wall")){
      this.titulo = '¡Estás creando un Wall!';
    }

    if(this.view.includes("chat")){
      this.titulo= '¡Estás creando una Chatstorie!';
    }

    this.parrafos.push('Comienza añadiendo el título y seleccionando una categoría.');
    this.parrafos.push('Selecciona la imagen que más te guste y escribe el inicio de historia.');
    this.parrafos.push('¡No olvides invitar a tus amigos y compartirlo en tus redes sociales!');

  }

  public entendido () {
    this.showCard = false;
    console.log(this.cats);
  }

}
