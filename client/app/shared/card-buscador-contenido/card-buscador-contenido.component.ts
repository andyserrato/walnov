import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Wall } from '../../models/wall';
import { Relato } from '../../models/relato.model';
import { ChatStory } from '../../models/chatstory.model';
import { Biblioteca } from '../../models/biblioteca';
import { RepositorioService } from '../../services/repositorio.service';


@Component({
  selector: 'app-card-buscador-contenido',
  templateUrl: './card-buscador-contenido.component.html',
  styleUrls: ['./card-buscador-contenido.component.scss']
})
export class CardBuscadorContenidoComponent implements OnInit {
  // entradas: Array<any>;
  biblioteca: Biblioteca;
  vacio: boolean = true;

  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {
    // this.entradas = new Array();
    this.biblioteca = new Biblioteca();
    this.biblioteca.walls = new Array();
    this.biblioteca.usuarios = new Array();
    this.biblioteca.relatos = new Array();
    this.biblioteca.chatstories = new Array();

    // for(let i=0; i<1; i++) {
    //   let nuevoWall = new Wall();
    //   let nuevoRelato = new Relato();
    //   let nuevoChatstory = new ChatStory();
    //
    //   nuevoWall.titulo = "Hola" + i;
    //   nuevoRelato.titulo = "Hola" + i;
    //   nuevoChatstory.titulo = "Hola" + i;
    //
    //   nuevoWall.usuario = new Usuario();
    //   nuevoRelato.usuario = new Usuario();
    //   nuevoChatstory.usuario = new Usuario();
    //
    //   nuevoWall.usuario.nombre = "User" + i;
    //   nuevoRelato.usuario.nombre = "User" + i;
    //   nuevoChatstory.usuario.nombre = "User" + i;
    //
    //   nuevoWall.cat = this.repositorio.categoriasAL[i];
    //   nuevoRelato.categoria = this.repositorio.categoriasAL[7];
    //   nuevoChatstory.categoria = this.repositorio.categoriasAL[3];
    //
    //   nuevoWall.urlImagen = "https://lorempixel.com/158/129";
    //   nuevoRelato.urlImagen = "https://lorempixel.com/158/129";
    //   nuevoChatstory.urlImagen = "https://lorempixel.com/158/129";
    //
    //   this.entradas.push(nuevoWall);
    //   this.entradas.push(nuevoRelato);
    //   this.entradas.push(nuevoChatstory);
    //
    //   this.biblioteca.walls.push(nuevoWall);
    //
    //
    // }

  }


  getType(entrada) {
    if( entrada instanceof Wall ) {this.vacio = false; return 0;}
    else if (entrada instanceof Relato) {this.vacio = false; return 1;}
    else if (entrada instanceof ChatStory) {this.vacio = false; return 2;}
    else return -1;


  }

  getBackgroundImage(entrada) {
    if( entrada instanceof Wall ) return 'linear-gradient(to bottom,'+entrada.cat.opacidad+','+entrada.cat.color+')';
    else if (entrada instanceof Relato) return 'linear-gradient(to bottom,'+entrada.categoria.opacidad+','+entrada.categoria.color+')';
    else if (entrada instanceof ChatStory) return 'linear-gradient(to bottom,'+entrada.categoria.opacidad+','+entrada.categoria.color+')';
    else return "";
  }

  getBorder(entrada) {
    if( entrada instanceof Wall ) return 'solid 2px '+entrada.cat.color;
    else if (entrada instanceof Relato) return 'solid 2px '+entrada.categoria.color;
    else if (entrada instanceof ChatStory) return 'solid 2px '+entrada.categoria.color;
    else return "";
  }

  getColor(entrada) {
    if( entrada instanceof Wall ) return entrada.cat.color;
    else if (entrada instanceof Relato) return entrada.categoria.color;
    else if (entrada instanceof ChatStory) return entrada.categoria.color;
    else return "";
  }

  isGuardado(entrada) {
    if( entrada instanceof Wall ) return this.biblioteca.walls.indexOf(entrada)>=0;
    else if (entrada instanceof Relato) return this.biblioteca.relatos.indexOf(entrada)>=0;
    else if (entrada instanceof ChatStory) return this.biblioteca.chatstories.indexOf(entrada)>=0;
    else return false;
  }

  guardar(entrada) {
    if( entrada instanceof Wall ) this.biblioteca.walls.push(entrada);
    else if (entrada instanceof Relato) this.biblioteca.relatos.push(entrada);
    else if (entrada instanceof ChatStory) this.biblioteca.chatstories.push(entrada);
    this.isGuardado(entrada);
  }

  eliminar(entrada) {
    if( entrada instanceof Wall ) this.biblioteca.walls.splice(this.biblioteca.walls.indexOf(entrada), 1);
    else if (entrada instanceof Relato) this.biblioteca.relatos.splice(this.biblioteca.relatos.indexOf(entrada), 1);
    else if (entrada instanceof ChatStory) this.biblioteca.chatstories.splice(this.biblioteca.chatstories.indexOf(entrada), 1);
    this.isGuardado(entrada);

  }
}
