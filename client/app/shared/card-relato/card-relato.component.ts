import { Component, OnInit} from '@angular/core';
import { Categoria } from '../../models/cats';
import { RepositorioService } from '../../services/repositorio.service';
import { Relato } from '../../models/relato';

@Component({
  selector: 'app-card-relato',
  templateUrl: './card-relato.component.html',
  styleUrls: ['./card-relato.component.scss']
})
export class CardRelatoComponent implements OnInit {
  relatoPrueba: Relato;

  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {
    this.relatoPrueba = new Relato();
    this.relatoPrueba.categoria = this.repositorio.categoriasAL[9];
    this.relatoPrueba.coments = 200324;
    this.relatoPrueba.imagen_url = "https://lorempixel.com/158/129";
    this.relatoPrueba.likes = 800;
    this.relatoPrueba.titulo = "Integer dui leo, sodales et tortor in, consequat placerat tellus.";
    this.relatoPrueba.resumen = "Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. ";
    this.relatoPrueba.views = 1293;

    this.relatoPrueba.userName = "Amorentrelineas";
    this.relatoPrueba.userImage = "https://lorempixel.com/22/22";
  }

  getBackgroundImage() {
    return 'linear-gradient(to bottom,'+this.relatoPrueba.categoria.opacidad+','+this.relatoPrueba.categoria.color+')';
  }

  getColor() {
    return this.relatoPrueba.categoria.color;
  }

  getNumber(numero: number) {
    if(numero>=1000) return '+' + Math.round(numero/1000) + 'K';
    return numero;

  }

}
