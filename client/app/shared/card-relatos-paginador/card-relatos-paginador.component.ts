import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Categoria } from '../../models/cats';
import { RepositorioService } from '../../services/repositorio.service';
import { Relato } from '../../models/relato';
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

    //for(let i=0; i<25; i++) {
      for(let j=0; j<100; j++) {
        let nuevoRL = new Relato();


         nuevoRL.categoria = this.repositorio.categoriasAL[0];
         nuevoRL.titulo = "Hola" + j;
         nuevoRL.imagen_url = "https://lorempixel.com/158/129";
         nuevoRL.coments = 200324;
         nuevoRL.resumen = "Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. ";
         nuevoRL.likes = 784;
         nuevoRL.views = 2000;
         nuevoRL.usuario = new Usuario();
         nuevoRL.usuario.nombre = "Amorentrelineas";
         nuevoRL.usuario.imagen = "https://lorempixel.com/22/22";
         this.repositorio.relatos.push(nuevoRL);
      }
    //}

    this.repositorio.paginadorCardsRelatos = new Paginator(this.relatosFiltrados, this.contenedorBiblioteca, 12, 6);

  }

  getBackgroundImage() {
    return 'linear-gradient(to bottom,'+this.categoria.opacidad+','+this.categoria.color+')';
  }

}
