import {Component, OnInit} from '@angular/core';
import {Categoria} from '../../models/cats';
import {Relato} from '../../models/relato.model';
import {RepositorioService} from '../../services/repositorio.service';
import {RelatoService} from '../../services/relato.service';
import {AuthenticationService} from '../../services/authentication.service';
import {BibliotecaService} from '../../services/biblioteca.service';
import {TranslateService} from "../../translate/translate.service";
import {AlertService} from "../../services/alert.service";
@Component({
  selector: 'app-buscador-relatos',
  templateUrl: './buscador-relatos.component.html',
  styleUrls: ['./buscador-relatos.component.scss']
})
export class BuscadorRelatosComponent implements OnInit {
  categoria: Categoria;
  relatosFiltrados: Array<Relato>;
  filtradosVacio = true;
  skip = 0;
  sortBy: string = null;

  constructor(private repositorio: RepositorioService,
              private relatosService: RelatoService,
              private authenticationService: AuthenticationService,
              private bibliotecaService: BibliotecaService,
              private translateService: TranslateService,
              private alert: AlertService) {
  }

  ngOnInit() {
    this.categoria = null;
    this.getRelatosByParams();
  }

  sortByFilter(event: string) {
    const myParams = new URLSearchParams();
    myParams.append('top', '20');
    if (event !== 'categoria') {
      this.sortBy = event;
    }

    if (this.sortBy !== null && this.sortBy !== '') {
      if (this.sortBy === this.translateService.instant('home_reciente_select_option_1')) {
        myParams.append('sort', 'relevantes');
      } else if (this.sortBy === this.translateService.instant('home_reciente_select_option_2')) {
        myParams.append('sort', '+likes');
      } else if (this.sortBy === this.translateService.instant('home_reciente_select_option_3')) {
        myParams.append('sort', '-likes');
      } else if (this.sortBy === this.translateService.instant('home_reciente_select_option_4')) {
        myParams.append('autor', this.authenticationService.getUser().id ? this.authenticationService.getUser().id : '');
        myParams.append('timeLine', 'followers');
      } else if (this.sortBy === this.translateService.instant('home_reciente_select_option_5')) {
        myParams.append('autor', this.authenticationService.getUser().id ? this.authenticationService.getUser().id : '');
        myParams.append('timeLine', 'following');
      } else if (this.sortBy === this.translateService.instant('home_reciente_select_option_6')) {
        myParams.append('sort', '+vecesVisto');
      } else if (this.sortBy === this.translateService.instant('home_reciente_select_option_7')) {
        myParams.append('sort', '-vecesVisto');
      }
    }

    if (this.categoria && this.categoria.nombre != null) {
      myParams.append('categoria', this.categoria.nombre);
      if (this.sortBy == null) {
        myParams.append('sort', 'relevantes');
      }
    }

    this.relatosService.getRelatoByQueryParams(myParams).subscribe(relatos => {
      if (this.authenticationService.isLoggedIn()) {
        this.bibliotecaService.getBibliotecaByCurrentUserId().subscribe(biblioteca => {
          this.bibliotecaService.updateBiblioteca(biblioteca);
        });
      }
      this.relatosFiltrados = relatos;
      this.repositorio.paginadorCardsRelatos.rellenar(this.relatosFiltrados);
      this.skip += 20;

    }, error => {
      this.alert.warning(error);
    });


    // this.chatservice.getChatStoryByQueryParams(myParams).subscribe(chatstories => {
    //   this.chatStoriesFiltrados = new Array<ChatStory>();
    //   this.repositorio.chatstories = chatstories;
    //   this.chatStoriesFiltrados = chatstories;
    //   this.paginador = new Paginator(this.chatStoriesFiltrados, this.div,  24, 6);
    //   this.skip += 60;
    //   this.skip += 20;
    // }, error => {
    //   this.alert.warning(error);
    // });
  }

  changeCategory(event: Categoria) {
    this.categoria = event;
    this.sortByFilter('categoria');
    // if (this.categoria === null) {
    //   this.relatosFiltrados = this.repositorio.relatos;
    // } else {
    //   this.relatosFiltrados = this.repositorio.relatos.filter(Relato => Relato.categoria.nombre === this.categoria.nombre);
    // }

  }

  getRelatosByParams() {
    this.relatosFiltrados = new Array<Relato>();
    this.categoria = null;
    // this.modalservice.load();
    const myParams = new URLSearchParams();
    myParams.append('top', '60');
    myParams.append('skip', '' + this.skip);

    this.relatosService.getRelatoByQueryParams(myParams).subscribe(relatos => {
      if (this.authenticationService.isLoggedIn()) {
        this.bibliotecaService.getBibliotecaByCurrentUserId().subscribe(biblioteca => {
          this.bibliotecaService.updateBiblioteca(biblioteca);
        });
      }
      this.relatosFiltrados = relatos;
      this.repositorio.paginadorCardsRelatos.rellenar(this.relatosFiltrados);
      this.skip += 60;

    });
  }

  scrollTop() {
    this.repositorio.paginadorCardsRelatos.scrollTop();
  }

  loadMore() {
    this.relatosFiltrados = new Array<Relato>();
    this.categoria = null;
    const myParams = new URLSearchParams();
    myParams.append('top', '60');
    myParams.append('skip', '' + this.skip);

    this.relatosService.getRelatoByQueryParams(myParams).subscribe(relatos => {
      if (this.authenticationService.isLoggedIn()) {
        this.bibliotecaService.getBibliotecaByCurrentUserId().subscribe(biblioteca => {
          this.bibliotecaService.updateBiblioteca(biblioteca);
        });
      }
      for (const r of relatos) {
        this.repositorio.paginadorCardsRelatos.push(r);
      }
      this.repositorio.paginadorCardsRelatos.paginarDelante();
      this.repositorio.paginadorCardsRelatos.final = false;
      this.skip += 60;
    });
  }
}
