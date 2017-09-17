import { Component, OnInit, Input } from '@angular/core';
import { Relato } from '../../models/relato.model';
import { Usuario } from '../../models/usuario.model';
import { RepositorioService } from '../../services/repositorio.service';



@Component({
  selector: 'app-card-info-relato',
  templateUrl: './card-info-relato.component.html',
  styleUrls: ['./card-info-relato.component.scss']
})
export class CardInfoRelatoComponent implements OnInit {
  relato: Relato;
  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {
    this.relato = new Relato();

    this.relato.categoria = this.repositorio.categoriasAL[0];
    this.relato.titulo = "Hola";
    this.relato.urlImagen = "https://lorempixel.com/158/129";
    this.relato.coments = 200324;
    this.relato.resumen = "Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. ";
    this.relato.likes = 784;
    this.relato.views = 2000;
    this.relato.usuario = new Usuario();
    this.relato.usuario.nombre = "Amorentrelineas";
    this.relato.usuario.walls = 14;
    this.relato.usuario.chatstories = 12;
    this.relato.usuario.relatos = 8;
    this.relato.usuario.imagen = "https://lorempixel.com/22/22";
  }

  getBorder() {
    return 'solid 1.5px '+ this.repositorio.categoriasHM.get(this.relato.categoria.nombre).color;

  }

  getColor() {
    return this.relato.categoria.color;

  }

  formatearNumero(nStr) {
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? ',' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}

}
