import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RepositorioService } from '../../../services/repositorio.service';
import { Relato } from '../../../models/relato';
import { Wall } from '../../../models/wall';
import { ChatStory } from '../../../models/chatstory.model';
import { Continuacion } from '../../../models/continuacion';
import { Historia } from '../../../models/historia';
import { Usuario } from '../../../models/usuario.model';
import { Paginator } from '../../../models/paginador';
import { OrderByPipe } from '../../../pipe/order-by/order-by.pipe';


@Component({
  selector: 'app-reciente-notificacion',
  templateUrl: './reciente-notificacion.component.html',
  styleUrls: ['./reciente-notificacion.component.scss']
})
export class RecienteNotificacionComponent implements OnInit {
  @ViewChild('contenedorBiblioteca') contenedorBiblioteca: ElementRef;

  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {

    for(let i=0; i<1; i++) {
      for(let j=1; j<11; j++) {
        let nuevoRL = new Relato();


         nuevoRL.categoria = this.repositorio.categoriasAL[j-1];
         nuevoRL.titulo = "Hola" + i;
         nuevoRL.imagen_url = "https://lorempixel.com/158/129";
         nuevoRL.coments = 200324;
         nuevoRL.texto = "Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. Meggings cred before they sold out messenger bag.";
         nuevoRL.likes = 784;
         nuevoRL.views = 2000;
         nuevoRL.usuario = new Usuario();
         nuevoRL.usuario.nombre = "Amorentrelineas";
         nuevoRL.usuario.imagen = "https://lorempixel.com/30/30";
         nuevoRL.usuario.seguido = true;
         nuevoRL.fechaCreacion = new Date(2013,j,17+j);
         this.addNotification(this.repositorio.actRec, nuevoRL);
      }
      for(let j=1; j<11; j++) {
        let nuevoRL = new Historia();


        //  nuevoRL.categoria = this.repositorio.categoriasAL[j];
         nuevoRL.wall = new Wall();
         nuevoRL.wall.titulo = "Hola" + i;
        //  nuevoRL.titulo = "Hola" + i;
        //  nuevoRL.imagen_url = "https://lorempixel.com/158/129";
        //  nuevoRL.coments = 200324;
         nuevoRL.texto = "Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. Meggings cred before they sold out messenger bag.";
         nuevoRL.likes = 784;
        //  nuevoRL.views = 2000;
         nuevoRL.usuario = new Usuario();
         nuevoRL.usuario.nombre = "Amorentrelineas";
         nuevoRL.usuario.imagen = "https://lorempixel.com/30/30";
         nuevoRL.usuario.seguido = true;
         nuevoRL.fechaCreacion = new Date(2014,j,17-j);
         this.addNotification(this.repositorio.actRec, nuevoRL);
      }
      for(let j=1; j<11; j++) {
        let nuevoRL = new Wall();


         nuevoRL.cat = this.repositorio.categoriasAL[j-1];
         nuevoRL.titulo = "Hola" + i;
         nuevoRL.imagen_url = "https://lorempixel.com/158/129";
        //  nuevoRL.coments = 200324;
         nuevoRL.texto = "Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. Meggings cred before they sold out messenger bag.";
         nuevoRL.likes = 784;
        //  nuevoRL.views = 2000;
         nuevoRL.usuario = new Usuario();
         nuevoRL.usuario.nombre = "Amorentrelineas";
         nuevoRL.usuario.imagen = "https://lorempixel.com/30/30";
         nuevoRL.usuario.seguido = true;
         nuevoRL.fechaCreacion = new Date(2015,9,j);
         this.addNotification(this.repositorio.actRec, nuevoRL);
      }
      for(let j=1; j<11; j++) {
        let nuevoRL = new ChatStory();


         nuevoRL.categoria = this.repositorio.categoriasAL[j-1];
         nuevoRL.titulo = "Hola" + i;
        //  nuevoRL.imagen_url = "https://lorempixel.com/158/129";
        //  nuevoRL.coments = 200324;
         nuevoRL.descripcion = "Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. Meggings cred before they sold out messenger bag.";
         nuevoRL.likes = 784;
         nuevoRL.views = 2000;
         nuevoRL.usuario = new Usuario();
         nuevoRL.usuario.nombre = "Amorentrelineas";
         nuevoRL.usuario.imagen = "https://lorempixel.com/30/30";
         nuevoRL.usuario.seguido = true;
         nuevoRL.fechaCreacion = new Date(2016,j,17-j+3);
         this.addNotification(this.repositorio.actRec, nuevoRL);
      }
      for(let j=1; j<11; j++) {
        let nuevoRL = new Continuacion();


        //  nuevoRL.categoria = this.repositorio.categoriasAL[j];
         nuevoRL.wall = new Wall();
         nuevoRL.wall.titulo = "Hola" + i;
        //  nuevoRL.titulo = "Hola" + i;
        //  nuevoRL.imagen_url = "https://lorempixel.com/158/129";
        //  nuevoRL.coments = 200324;
         nuevoRL.texto = "Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. Meggings cred before they sold out messenger bag.";
         nuevoRL.likes = 784;
        //  nuevoRL.views = 2000;
         nuevoRL.usuario = new Usuario();
         nuevoRL.usuario.nombre = "Amorentrelineas";
         nuevoRL.usuario.imagen = "https://lorempixel.com/30/30";
         nuevoRL.usuario.seguido = true;
         nuevoRL.fechaCreacion = new Date(2012,10,j);
         this.addNotification(this.repositorio.actRec, nuevoRL);
      }
    }
    // this.repositorio.actRec = this.sortByDate(this.repositorio.actRec);
    this.repositorio.paginadorActividadReciente = new Paginator(this.repositorio.actRec, this.contenedorBiblioteca, 12, 6);
  }

  sortByDate(value: any, args?: any): any {
      let newVal = value.sort((a: any, b: any) => {
          let date1 = new Date(a.fechaCreacion);
          let date2 = new Date(b.fechaCreacion);

          if (date1 > date2) {
              return -1;
          } else if (date1 < date2) {
              return 1;
          } else {
              return 0;
          }
      });
      return newVal;
  }

  addNotification(array:any, object: any) {
    if(object.usuario.seguido) {
      array.push(object);
      array = this.sortByDate(array);

    }

  }

}
