import { Component, OnInit } from '@angular/core';
import { Relato } from '../../models/relato';
import { RepositorioService } from '../../services/repositorio.service';

@Component({
  selector: 'app-crear-relato',
  templateUrl: './crear-relato.component.html',
  styleUrls: ['./crear-relato.component.scss']
})
export class CrearRelatoComponent implements OnInit {
  relato: Relato;
  constructor(private repositorio: RepositorioService) {
    this.relato=new Relato();
    this.relato.imagen_url="http://www.lorempixel.com/1200/1600";
    this.relato.categoria = this.repositorio.categoriasAL[0];
    this.relato.titulo="";
    this.relato.texto="";
    this.relato.tags = new Array<string>();
  }

  ngOnInit() {
  }

}
