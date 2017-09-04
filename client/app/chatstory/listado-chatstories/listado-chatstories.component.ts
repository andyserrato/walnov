import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/cats';
import { ChatStory } from '../../models/chatstory.model';
import { RepositorioService } from '../../services/repositorio.service';
import { Paginator } from '../../models/paginador';
import { ChatstoryService } from '../../services/chatstory.service';

@Component({
  selector: 'app-listado-chatstories',
  templateUrl: './listado-chatstories.component.html',
  styleUrls: ['./listado-chatstories.component.scss']
})
export class ListadoChatstoriesComponent implements OnInit {
  categoria: Categoria;
  chatStoriesFiltrados: Array<ChatStory>;
  filtradosVacio = true;
  constructor(private repositorio: RepositorioService,
              private chatservice: ChatstoryService) {

  }

  ngOnInit() {
    this.chatStoriesFiltrados = new Array<ChatStory>();
    this.categoria = null;
    this.chatservice.getChatStories().subscribe(chatstories => {
      this.repositorio.chatstories = chatstories;
      this.chatStoriesFiltrados = chatstories;
      console.log(this.chatStoriesFiltrados);
      this.changeCategory(null);
    });
  }

  changeCategory(event: Categoria) {
    this.categoria = event;
    if (this.categoria === null) {
      this.chatStoriesFiltrados = this.repositorio.chatstories;
      // console.log(this.repositorio.paginadorCardsChatstories);
    } else {
      this.chatStoriesFiltrados = this.repositorio.chatstories.filter(ChatStory => ChatStory.categoria === this.categoria.nombre);
    }
    this.repositorio.paginadorCardsChatstories.rellenar(this.chatStoriesFiltrados);
    // console.log(this.repositorio.paginadorCardsChatstories)
  }

  // filtrarCategoria() {
  //   if(!(this.categoria == null)) {
  //     this.chatStoriesFiltrados = this.repositorio.chatstories.filter(Chatstory => Chatstory.categoria.nombre === this.categoria.nombre);
  //   }
  // }

}
