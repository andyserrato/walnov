import { Component, OnInit } from '@angular/core';
import { RepositorioService } from '../../services/repositorio.service';
import { Relato } from '../../models/relato.model';

@Component({
  selector: 'app-card-relato-relevante',
  templateUrl: './card-relato-relevante.component.html',
  styleUrls: ['./card-relato-relevante.component.scss']
})
export class CardRelatoRelevanteComponent implements OnInit {

  relatos: any;
  relato1: any;
  relato2: any;
  relato3: any;
  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {

    this.relatos = new Array();

    this.relato1 = new Relato();
    this.relato1.titulo = "Mercenario del tiempo";
    this.relato1.categoria = this.repositorio.categoriasAL[0];
    this.relato1.likes = 22;
    this.relato1.coments = 8;

    this.relato2 = new Relato();
    this.relato2.titulo = "El amante secreto";
    this.relato2.categoria = this.repositorio.categoriasAL[6];
    this.relato2.likes = 24;
    this.relato2.coments = 6;

    this.relato3 = new Relato();
    this.relato3.titulo = "Los molinos de viento";
    this.relato3.categoria = this.repositorio.categoriasAL[4];
    this.relato3.likes = 27;
    this.relato3.coments = 12;

    this.relatos.push(this.relato1);
    this.relatos.push(this.relato2);
    this.relatos.push(this.relato3);

    setInterval(this.showAnother.bind(this), 30000,);

  }

  showAnother() {
    let relato = this.relatos[0];
    this.relatos.splice(0,1);
    this.relatos.push(relato);

  }

  loadRelato(relato) {
    //this.router.navigate(['/chatstory/'+chatstory.id]);
  }

  getBorder(relato: any) {
    return 'solid 1.5px ' + relato.categoria.color;

  }

  getColor(relato: any) {
    return relato.categoria.color;

  }

}
