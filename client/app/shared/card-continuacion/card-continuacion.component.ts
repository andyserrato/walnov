import { Component, OnInit, Input } from '@angular/core';
import { Wall } from '../../models/wall';
import { Continuacion } from '../../models/continuacion';
import { RepositorioService } from '../../services/repositorio.service';
import { TranslateService } from '../../translate';


@Component({
  selector: 'app-card-continuacion',
  templateUrl: './card-continuacion.component.html',
  styleUrls: ['./card-continuacion.component.scss']
})
export class CardContinuacionComponent implements OnInit {

  constructor(private repositorio: RepositorioService, private translate: TranslateService) { }
  @Input() continuacion: Continuacion;
  ngOnInit() {
    // this.wall = new Wall();
    // this.wall.titulo = "Mercenario del tiempo";
    // this.wall.cat = this.repositorio.categoriasAL[9];
    // let continuacion = "Lorem ipsum dolor sit amet, consectetur adipiscing elit inum mer et eleifend porttitor, odio nulla condiment. Cras accumsan, nisl et eleifend pLorem ipsum jkdfhkjs jdshgfhkhjdgf dfjkghjkdfhjghkdf";
    // this.wall.continuaciones = new Array();
    // this.wall.continuaciones.push(continuacion);
    // this.wall.likes = 22349;
  }

  getNumber(numero: number) {
    if(numero>=1000) return '+' + Math.round(numero/1000) + 'K';
    return numero;

  }

  getColor() {
    return this.continuacion.wall.cat.color;

  }

  getSubstring() {
    if(this.continuacion.texto.length > 154) {
      return this.continuacion.texto.substring(0,154);
    }
    else {
      return this.continuacion.texto;
    }
  }

}
