import {Component, OnInit} from '@angular/core';
import {Categoria} from '../../models/cats';
import {Relato} from '../../models/relato.model';
import {RepositorioService} from '../../services/repositorio.service';
import {Paginator} from '../../models/paginador';
import {RelatoService} from "../../services/relato.service";
import {AuthenticationService} from "../../services/authentication.service";
import {BibliotecaService} from "../../services/biblioteca.service";
import { ModalService } from "../../services/modal.service";
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

  constructor(private repositorio: RepositorioService,
              private relatosService: RelatoService,
              private authenticationService: AuthenticationService,
              private bibliotecaService: BibliotecaService,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.categoria = null;
    // this.relatosFiltrados = this.repositorio.relatos;
    this.getRelatosByParams();
  }

  changeCategory(event: Categoria) {
    this.categoria = event;

    if (this.categoria === null) {
      this.relatosFiltrados = this.repositorio.relatos;
    } else {
      this.relatosFiltrados = this.repositorio.relatos.filter(Relato => Relato.categoria.nombre === this.categoria.nombre);
    }

    //this.repositorio.paginadorCardsRelatos.rellenar(this.relatosFiltrados);
    //console.log(this.repositorio.paginadorCardsChatstories)
  }

  getRelatosByParams() {
    this.modalService.load();
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
      this.modalService.clear();
      // this.paginador = new Paginator(this.relatosFiltrados, this.div,  24, 6);
      // this.changeCategory(null);
      this.skip += 60;
      // this.modalservice.clear();

    });
  }

  scrollTop() {
    this.repositorio.paginadorCardsRelatos.scrollTop();
  }

  loadMore() {
    this.modalService.load();
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
      for(let r of relatos) {
        this.repositorio.paginadorCardsRelatos.push(r);
      }
      // this.repositorio.paginadorCardsRelatos.rellenar(this.relatosFiltrados);
      this.modalService.clear();
      this.repositorio.paginadorCardsRelatos.paginarDelante();      
      this.repositorio.paginadorCardsRelatos.final = false;
      this.skip += 60;
      // this.paginador = new Paginator(this.relatosFiltrados, this.div,  24, 6);
      // this.changeCategory(null);
      // this.skip += 60;
      // this.modalservice.clear();

    });
  }
}
