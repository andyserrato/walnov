import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Categoria } from '../../models/cats';
import { RepositorioService } from '../../services/repositorio.service';
import { Relato } from '../../models/relato.model';
import { Usuario } from '../../models/usuario.model';
import { Paginator } from '../../models/paginador';

@Component({
  selector: 'app-home-mis-relatos',
  templateUrl: './home-mis-relatos.component.html',
  styleUrls: ['./home-mis-relatos.component.scss']
})
export class HomeMisRelatosComponent implements OnInit {
  @ViewChild('contenedorBiblioteca') contenedorBiblioteca: ElementRef;
  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {
    this.repositorio.paginadorCardsRelatos = new Paginator(this.repositorio.relatos, this.contenedorBiblioteca, 12, 6);
  }

}
