import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Categoria } from '../../models/cats';
import { RepositorioService } from '../../services/repositorio.service';
import { Relato } from '../../models/relato.model';
import { Usuario } from '../../models/usuario.model';
import { Paginator } from '../../models/paginador';
import { BibliotecaService } from '../../services/biblioteca.service';
<<<<<<< HEAD
import { AuthenticationService } from '../../services/authentication.service';
=======
import {AuthenticationService} from "../../services/authentication.service";
>>>>>>> cf6744306fada434c994fb58c7686bc9fd8764c0
@Component({
  selector: 'app-card-relatos-paginador',
  templateUrl: './card-relatos-paginador.component.html',
  styleUrls: ['./card-relatos-paginador.component.scss']
})
export class CardRelatosPaginadorComponent implements OnInit {
  @Input() relatosFiltrados: Array<Relato>;
  @Input() categoria: Categoria;
  @ViewChild('contenedorBiblioteca') contenedorBiblioteca: ElementRef;
<<<<<<< HEAD
  bibliotecaLoaded: boolean = false;
  constructor(private repositorio: RepositorioService, private bibliotecaService: BibliotecaService,
=======
  bibliotecaLoaded = false;
  constructor(private repositorio: RepositorioService,
              private bibliotecaService: BibliotecaService,
>>>>>>> cf6744306fada434c994fb58c7686bc9fd8764c0
              private auth: AuthenticationService) { }

  ngOnInit() {
    this.repositorio.paginadorCardsRelatos = new Paginator(this.relatosFiltrados, this.contenedorBiblioteca, 12, 6);
<<<<<<< HEAD
    if(this.auth.isLoggedIn()) {
      this.bibliotecaService.getBibliotecaByCurrentUserId().subscribe(bibl => {
        this.bibliotecaService.updateBiblioteca(bibl);
        this.bibliotecaLoaded = true;
      });
    } else {
      this.bibliotecaLoaded = true;
=======
    if (this.auth.isLoggedIn()) {
      this.bibliotecaService.getBibliotecaByCurrentUserId().subscribe(biblioteca => {
        this.bibliotecaService.updateBiblioteca(biblioteca);
        this.bibliotecaLoaded = true;
      });
>>>>>>> cf6744306fada434c994fb58c7686bc9fd8764c0
    }
  }

  getBackgroundImage() {
    return 'linear-gradient(to bottom,' + this.categoria.opacidad + ',' + this.categoria.color + ')';
  }

}
