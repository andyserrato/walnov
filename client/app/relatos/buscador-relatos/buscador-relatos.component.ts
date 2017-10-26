import {Component, OnInit} from '@angular/core';
import {Categoria} from '../../models/cats';
import {Relato} from '../../models/relato.model';
import {RepositorioService} from '../../services/repositorio.service';
import {RelatoService} from '../../services/relato.service';
import {AuthenticationService} from '../../services/authentication.service';
import {BibliotecaService} from '../../services/biblioteca.service';
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
              private bibliotecaService: BibliotecaService) {
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
