import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Categoria } from '../../../models/cats';
import { RepositorioService } from '../../../services/repositorio.service';
import { Wall } from '../../../models/wall';
import { Continuacion } from '../../../models/continuacion';
import { Paginator } from '../../../models/paginador';

@Component({
  selector: 'app-user-content-continuaciones',
  templateUrl: './user-content-continuaciones.component.html',
  styleUrls: ['./user-content-continuaciones.component.scss']
})
export class UserContentContinuacionesComponent implements OnInit {
  @ViewChild('contenedorBiblioteca') contenedorBiblioteca: ElementRef;
  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {

    for(let i=0; i<25; i++) {
      for(let j=0; j<10; j++) {
        let nuevaCont = new Continuacion();

         nuevaCont.wall = new Wall();
         nuevaCont.wall.cat = this.repositorio.categoriasAL[j];
         nuevaCont.wall.titulo = "Hola" + i;
         nuevaCont.likes = 234;
         nuevaCont.texto = "Lorem ipsum dolor sit amet, consectetur adipiscing elit inum mer et eleifend porttitor, odio nulla condiment. Cras accumsan, nisl et eleifend pLorem ipsum jkdfhkjs jdshgfhkhjdgf dfjkghjkdfhjghkdf"


         this.repositorio.conts.push(nuevaCont);
      }
    }

    this.repositorio.paginadorCardsContinuaciones = new Paginator(this.repositorio.conts, this.contenedorBiblioteca, 12, 6);
  }

}
