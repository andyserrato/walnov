import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/cats';
import { Relato } from '../../models/relato.model';
import { RepositorioService } from '../../services/repositorio.service';
import { Paginator } from '../../models/paginador';

@Component({
  selector: 'app-buscador-relatos',
  templateUrl: './buscador-relatos.component.html',
  styleUrls: ['./buscador-relatos.component.scss']
})
export class BuscadorRelatosComponent implements OnInit {
  categoria: Categoria;
  relatosFiltrados: Array<Relato>;
  filtradosVacio: boolean = true;
  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {
    this.categoria = null;
    this.relatosFiltrados = this.repositorio.relatos;
  }

  changeCategory(event: Categoria) {
    this.categoria = event;

    if(this.categoria === null) {
      this.relatosFiltrados = this.repositorio.relatos;
      //console.log(this.repositorio.paginadorCardsChatstories);
    }
    else {
      this.relatosFiltrados = this.repositorio.relatos.filter(Relato => Relato.categoria.nombre === this.categoria.nombre);
    }

    this.repositorio.paginadorCardsRelatos.rellenar(this.relatosFiltrados);
    //console.log(this.repositorio.paginadorCardsChatstories)
  }

}
