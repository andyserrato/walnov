import { Component, OnInit, Input} from '@angular/core';
import { Categoria } from '../../models/cats';
import { RepositorioService } from '../../services/repositorio.service';
import { Relato } from '../../models/relato.model';

@Component({
  selector: 'app-card-relato',
  templateUrl: './card-relato.component.html',
  styleUrls: ['./card-relato.component.scss']
})
export class CardRelatoComponent implements OnInit {
  @Input() relato: Relato;
  @Input() vista: string;


  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {
    // this.relatoPrueba = new Relato();
    // this.relatoPrueba.categoria = this.repositorio.categoriasAL[9];
    // this.relatoPrueba.coments = 200324;
    // this.relatoPrueba.urlImagen = "https://lorempixel.com/158/129";
    // this.relatoPrueba.likes = 800;
    // this.relatoPrueba.titulo = "Integer dui leo, sodales et tortor in, consequat placerat tellus.";
    // this.relatoPrueba.resumen = "Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. ";
    // this.relatoPrueba.views = 1293;
    //
    // this.relatoPrueba.userName = "Amorentrelineas";
    // this.relatoPrueba.userImage = "https://lorempixel.com/22/22";

  }

  getBackgroundImage() {
    return 'linear-gradient(to bottom,'+this.relato.categoria.opacidad+','+this.relato.categoria.color+')';
  }

  getColor() {
    return this.relato.categoria.color;
  }

  getNumber(numero: number) {
    if(numero>=1000) return '+' + Math.round(numero/1000) + 'K';
    return numero;

  }

}
