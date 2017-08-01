import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/cats';
import { Chatstory } from '../../models/chatstory.model';
import { RepositorioService } from '../../services/repositorio.service';
import { Paginator } from '../../models/paginador';


@Component({
  selector: 'app-listado-chatstories',
  templateUrl: './listado-chatstories.component.html',
  styleUrls: ['./listado-chatstories.component.scss']
})
export class ListadoChatstoriesComponent implements OnInit {
  categoria: Categoria;
  chatStoriesFiltrados: Array<Chatstory>;
  filtradosVacio: boolean = true;
  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {
    this.categoria = null;
    this.chatStoriesFiltrados = this.repositorio.chatstories;
  }

  changeCategory(event: Categoria) {
    this.categoria = event;
    if(this.categoria === null) {
      this.chatStoriesFiltrados = this.repositorio.chatstories;
      //console.log(this.repositorio.paginadorCardsChatstories);
    }
    else {
      this.chatStoriesFiltrados = this.repositorio.chatstories.filter(Chatstory => Chatstory.categoria.nombre === this.categoria.nombre);
    }
    this.repositorio.paginadorCardsChatstories.rellenar(this.chatStoriesFiltrados);
    //console.log(this.repositorio.paginadorCardsChatstories)
  }

  // filtrarCategoria() {
  //   if(!(this.categoria == null)) {
  //     this.chatStoriesFiltrados = this.repositorio.chatstories.filter(Chatstory => Chatstory.categoria.nombre === this.categoria.nombre);
  //   }
  // }

}
