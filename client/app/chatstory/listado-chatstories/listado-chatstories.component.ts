import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Categoria } from '../../models/cats';
import { ChatStory } from '../../models/chatstory.model';
import { RepositorioService } from '../../services/repositorio.service';
import { Paginator } from '../../models/paginador';
import { ChatstoryService } from '../../services/chatstory.service';
import { ModalService } from '../../services/modal.service';
import { AuthenticationService } from '../../services/authentication.service';
import { TranslateService } from '../../translate/translate.service';
import {AlertService} from '../../services/alert.service';
import {BibliotecaService} from "../../services/biblioteca.service";

@Component({
  selector: 'app-listado-chatstories',
  templateUrl: './listado-chatstories.component.html',
  styleUrls: ['./listado-chatstories.component.scss']
})
export class ListadoChatstoriesComponent implements OnInit {
  categoria: Categoria;
  sortBy: string = null;
  chatStoriesFiltrados: Array<any>;
  paginador: Paginator;
  filtradosVacio = true;
  @ViewChild('div') div: ElementRef;
  skip = 0;
  constructor(private repositorio: RepositorioService,
              private chatservice: ChatstoryService,
              private authenticationService: AuthenticationService,
              private modalservice: ModalService,
              private translateService: TranslateService,
              private alert: AlertService,
              private bibliotecaService: BibliotecaService) {

  }

  ngOnInit() {
    this.chatStoriesFiltrados = new Array<ChatStory>();
    this.categoria = null;
    this.modalservice.load();
    const myParams = new URLSearchParams();
    myParams.append('top', '60');
    myParams.append('skip', '' + this.skip);

    this.chatservice.getChatStoryByQueryParams(myParams).subscribe(chatstories => {
      if(this.authenticationService.isLoggedIn()) {
        this.bibliotecaService.getBibliotecaByCurrentUserId().subscribe(biblioteca => {
          this.bibliotecaService.updateBiblioteca(biblioteca);
          // this.changeCategory(null);
          this.repositorio.chatstories = chatstories;
          this.chatStoriesFiltrados = chatstories;
          this.paginador = new Paginator(this.chatStoriesFiltrados, this.div,  24, 6);
          this.skip+=60;
          this.modalservice.clear();
        });
      } else {

        this.repositorio.chatstories = chatstories;
        this.chatStoriesFiltrados = chatstories;
        this.paginador = new Paginator(this.chatStoriesFiltrados, this.div,  24, 6);
        // this.changeCategory(null);
        this.skip+=60;
        this.modalservice.clear();
      }

    });
  }

  changeCategory(event: Categoria) {
    this.categoria = event;

    // if (this.categoria === null) {
    //   this.chatStoriesFiltrados = this.repositorio.chatstories;
    // } else {
    //   this.chatStoriesFiltrados = this.repositorio.chatstories.filter(ChatStory => this.translateService.translate(ChatStory.categoria) === this.translateService.translate(this.categoria.nombre));
    // }
    // this.repositorio.paginadorCardsChatstories.rellenar(this.chatStoriesFiltrados);
    this.sortByFilter('categoria');
  }

  loadMore() {
    this.modalservice.load();

    const myParams = new URLSearchParams();
    myParams.append('top', '60');
    myParams.append('skip', '' + this.skip);

    this.chatservice.getChatStoryByQueryParams(myParams).subscribe(chatstories => {
      for (const c of chatstories) {
        this.paginador.paginador.push(c);
      }
      this.repositorio.chatstories = this.chatStoriesFiltrados;
      this.modalservice.clear();
      this.paginador.paginarDelante();
      this.paginador.final = false;
      this.skip += 60;
    });
  }

  sortByFilter(event: string) {
    this.modalservice.load();
    const myParams = new URLSearchParams();
    myParams.append('top', '20');

    if (event !== 'categoria') {
      this.sortBy = event;
    }

    if (this.sortBy !== null && this.sortBy !== '') {
      if (this.sortBy === 'Relevant') {
        myParams.append('sort', 'relevantes');
      } else if (this.sortBy === '+Liked') {
        myParams.append('sort', '+likes');
      } else if (this.sortBy === '-Liked') {
        myParams.append('sort', '-likes');
      } else if (this.sortBy === 'Followers') {
        myParams.append('autor', this.authenticationService.getUser().id ? this.authenticationService.getUser().id : '');
        myParams.append('timeLine', 'followers');
      } else if (this.sortBy === 'Following') {
        myParams.append('autor', this.authenticationService.getUser().id ? this.authenticationService.getUser().id : '');
        myParams.append('timeLine', 'following');
      }
    }

    if (this.categoria && this.categoria.nombre != null) {
      myParams.append('categoria', this.categoria.nombre);
      if (this.sortBy == null) {
        myParams.append('sort', 'relevantes');
      }
    }

    this.chatservice.getChatStoryByQueryParams(myParams).subscribe(chatstories => {
      this.chatStoriesFiltrados = new Array<ChatStory>();
      this.repositorio.chatstories = chatstories;
      this.chatStoriesFiltrados = chatstories;
      // this.repositorio.paginadorCardsChatstories.rellenar(this.chatStoriesFiltrados);
      this.modalservice.clear();
      this.skip += 20;
    }, error => {
      this.alert.warning(error);
      this.modalservice.clear();
    });
  }

  scrollTop() {
    this.paginador.scrollTop();
  }
}
