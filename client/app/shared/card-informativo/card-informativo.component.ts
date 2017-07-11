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
  @Input() cats: any;

  constructor() {
    // de forma momentánea pues no
    this.showButton = true;
    this.buttonText = 'Entendido';
    this.parrafos = new Array<string>();
    this.parrafos.push('¡Estas creando un wall!');
    this.parrafos.push('Comienza añadiendo el título y seleccionando una categoría.');
    this.parrafos.push('Selecciona la imagen que mñas te guste y escribe el inicio de historia.');
    this.parrafos.push('¡No Olvides invitar a tus amigos y compartirlo en tus redes sociales');
  }

  ngOnInit() {
  }

  public entendido () {
    this.showCard = false;
    console.log(this.cats);
  }

}
