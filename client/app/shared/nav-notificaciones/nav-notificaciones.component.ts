import { Component, OnInit, ViewChild, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import { MessageTimePipe } from '../../pipe/message-time/message-time.pipe';
import { Usuario } from '../../models/usuario.model';
import { Paginator } from '../../models/paginador';
import { ChatStory } from '../../models/chatstory.model';
import { Relato } from '../../models/relato.model';
import { Wall } from '../../models/wall';
import { Continuacion } from '../../models/continuacion';
import { Historia } from '../../models/historia';
import { RepositorioService } from '../../services/repositorio.service';
import { TranslateService } from '../../translate';
@Component({
  selector: 'app-nav-notificaciones',
  templateUrl: './nav-notificaciones.component.html',
  styleUrls: ['./nav-notificaciones.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class NavNotificacionesComponent implements OnInit {
  Altura: number;
  visible = false;
  nots: Array<any>;
  @ViewChild('contenedorBiblioteca') contenedorBiblioteca: ElementRef;
  @ViewChild('div') div: ElementRef;
  constructor(private repositorio: RepositorioService, private translate: TranslateService) {
    let getWindow = () => {
          return window.innerHeight;
    };
    this.Altura = getWindow() - 100;
    window.onresize = () => {
        this.Altura = getWindow() - 100;
        // this.cdr.detectChanges(); //running change detection manually
        // this.landingMobile();
        // console.log(this.Altura);

    };
  }

  ngOnInit() {

    for (let i = 0; i < 1; i++) {
      for (let j = 1; j < 11; j++) {
        const nuevoRL = new Relato();


         nuevoRL.categoria = this.repositorio.categoriasAL[j - 1];
         nuevoRL.titulo = 'Hola' + i;
         nuevoRL.urlImagen = 'https://lorempixel.com/158/129';
         nuevoRL.coments = 200324;
         nuevoRL.texto = 'Portland ugh fashion axe Helvetica, YOLO Echo Park Austin' +
           ' gastropub roof party. Meggings cred before they sold out messenger bag.';
         nuevoRL.likes = 784;
         nuevoRL.views = 2000;
         nuevoRL.usuario = new Usuario();
         nuevoRL.usuario.nombre = 'Amorentrelineas';
         nuevoRL.usuario.imagen = 'https://lorempixel.com/30/30';
         nuevoRL.usuario.seguido = true;
         nuevoRL.fechaCreacion = new Date(2013, j, 17 + j);
         this.addNotification(this.repositorio.actRec, nuevoRL);
      }
      for (let j = 1; j < 11; j++) {
        const nuevoRL = new Historia();


        //  nuevoRL.categoria = this.repositorio.categoriasAL[j];
         nuevoRL.wall = new Wall();
         nuevoRL.wall.titulo = 'Hola' + i;
        //  nuevoRL.titulo = "Hola" + i;
        //  nuevoRL.urlImagen = "https://lorempixel.com/158/129";
        //  nuevoRL.coments = 200324;
         nuevoRL.texto = 'Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. Meggings ' +
           'cred before they sold out messenger bag.';
         nuevoRL.likes = 784;
        //  nuevoRL.views = 2000;
         nuevoRL.usuario = new Usuario();
         nuevoRL.usuario.nombre = 'Amorentrelineas';
         nuevoRL.usuario.imagen = 'https://lorempixel.com/30/30';
         nuevoRL.usuario.seguido = true;
         nuevoRL.fechaCreacion = new Date(2014, j, 17 - j);
         this.addNotification(this.repositorio.actRec, nuevoRL);
      }
      for (let j = 1; j < 11; j++) {
        const nuevoRL = new Wall();


         nuevoRL.cat = this.repositorio.categoriasAL[j - 1];
         nuevoRL.titulo = 'Hola' + i;
         nuevoRL.urlImagen = 'https://lorempixel.com/158/129';
        //  nuevoRL.coments = 200324;
         nuevoRL.texto = 'Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. ' +
           'Meggings cred before they sold out messenger bag.';
         nuevoRL.likes = 784;
        //  nuevoRL.views = 2000;
         nuevoRL.usuario = new Usuario();
         nuevoRL.usuario.nombre = 'Amorentrelineas';
         nuevoRL.usuario.imagen = 'https://lorempixel.com/30/30';
         nuevoRL.usuario.seguido = true;
         nuevoRL.fechaCreacion = new Date(2015, 9, j);
         this.addNotification(this.repositorio.actRec, nuevoRL);
      }
      for (let j = 1; j < 11; j++) {
        const nuevoRL = new ChatStory();


         nuevoRL.categoria = this.repositorio.categoriasAL[j - 1];
         nuevoRL.titulo = 'Hola' + i;
        //  nuevoRL.urlImagen = "https://lorempixel.com/158/129";
        //  nuevoRL.coments = 200324;
         nuevoRL.descripcion = 'Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. ' +
           'Meggings cred before they sold out messenger bag.';
         nuevoRL.likes = 784;
         nuevoRL.views = 2000;
         nuevoRL.usuario = new Usuario();
         nuevoRL.usuario.nombre = 'Amorentrelineas';
         nuevoRL.usuario.imagen = 'https://lorempixel.com/30/30';
         nuevoRL.usuario.seguido = true;
         nuevoRL.fechaCreacion = new Date(2016, j, 17 - j + 3);
         this.addNotification(this.repositorio.actRec, nuevoRL);
      }
      for (let j = 1; j < 11; j++) {
        const nuevoRL = new Continuacion();


        //  nuevoRL.categoria = this.repositorio.categoriasAL[j];
         nuevoRL.wall = new Wall();
         nuevoRL.wall.titulo = 'Hola' + i;
        //  nuevoRL.titulo = "Hola" + i;
        //  nuevoRL.urlImagen = "https://lorempixel.com/158/129";
        //  nuevoRL.coments = 200324;
         nuevoRL.texto = 'Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. ' +
           'Meggings cred before they sold out messenger bag.';
         nuevoRL.likes = 784;
        //  nuevoRL.views = 2000;
         nuevoRL.usuario = new Usuario();
         nuevoRL.usuario.nombre = 'Amorentrelineas';
         nuevoRL.usuario.imagen = 'https://lorempixel.com/30/30';
         nuevoRL.usuario.seguido = true;
         nuevoRL.fechaCreacion = new Date(2012, 10, j);
         this.addNotification(this.repositorio.actRec, nuevoRL);
      }
    }
    // this.repositorio.actRec = this.sortByDate(this.repositorio.actRec);
    // this.repositorio.paginadorActividadReciente = new Paginator(this.repositorio.actRec, this.contenedorBiblioteca, 12, 6);
  }

  sortByDate(value: any, args?: any): any {
      const newVal = value.sort((a: any, b: any) => {
          const date1 = new Date(a.fechaCreacion);
          const date2 = new Date(b.fechaCreacion);

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

  addNotification(array: any, object: any) {
    if (object.usuario.seguido) {
      array.push(object);
      array = this.sortByDate(array);

    }

  }

  onClick(event) {
    if (!this.div.nativeElement.contains(event.target) && this.visible) {
      this.visible = false;
    }
  }

  close() {
    this.visible = false;
  }

  inicializa() {
    this.visible=!this.visible;
    // this.repositorio.paginadorActividadReciente = new Paginator(this.repositorio.actRec, this.contenedorBiblioteca, 12, 6);

  }

  getAltura() {
    console.log(this.Altura + 'px');
    return this.Altura + 'px';
  }

}
