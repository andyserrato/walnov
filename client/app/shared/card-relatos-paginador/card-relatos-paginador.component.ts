import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Categoria } from '../../models/cats';
import { RepositorioService } from '../../services/repositorio.service';
import { Relato } from '../../models/relato.model';
import { Usuario } from '../../models/usuario.model';
import { Paginator } from '../../models/paginador';

@Component({
  selector: 'app-card-relatos-paginador',
  templateUrl: './card-relatos-paginador.component.html',
  styleUrls: ['./card-relatos-paginador.component.scss']
})
export class CardRelatosPaginadorComponent implements OnInit {
  @Input() relatosFiltrados: Array<Relato>;
  @Input() categoria: Categoria;
  @ViewChild('contenedorBiblioteca') contenedorBiblioteca: ElementRef;
  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {
    this.repositorio.paginadorCardsRelatos = new Paginator(this.relatosFiltrados, this.contenedorBiblioteca, 12, 6);
  }

  getBackgroundImage() {
    return 'linear-gradient(to bottom,' + this.categoria.opacidad + ',' + this.categoria.color + ')';
  }

}
