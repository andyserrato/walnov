import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Categoria } from '../../models/cats';
import { RepositorioService } from '../../services/repositorio.service';
import { Relato } from '../../models/relato.model';
import { Usuario } from '../../models/usuario.model';
import { Paginator } from '../../models/paginador';
import { BibliotecaService } from '../../services/biblioteca.service';
import {AuthenticationService} from "../../services/authentication.service";
@Component({
  selector: 'app-card-relatos-paginador',
  templateUrl: './card-relatos-paginador.component.html',
  styleUrls: ['./card-relatos-paginador.component.scss']
})
export class CardRelatosPaginadorComponent implements OnInit {
  @Input() relatosFiltrados: Array<Relato>;
  @Input() categoria: Categoria;
  @ViewChild('contenedorBiblioteca') contenedorBiblioteca: ElementRef;
  bibliotecaLoaded = false;
  constructor(private repositorio: RepositorioService,
              private bibliotecaService: BibliotecaService,
              private auth: AuthenticationService) { }

  ngOnInit() {
    this.repositorio.paginadorCardsRelatos = new Paginator(this.relatosFiltrados, this.contenedorBiblioteca, 12, 6);
    if (this.auth.isLoggedIn()) {
      this.bibliotecaService.getBibliotecaByCurrentUserId().subscribe(biblioteca => {
        this.bibliotecaService.updateBiblioteca(biblioteca);
        this.bibliotecaLoaded = true;
      });
    }
  }

  getBackgroundImage() {
    return 'linear-gradient(to bottom,' + this.categoria.opacidad + ',' + this.categoria.color + ')';
  }

}
