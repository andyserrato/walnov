import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Categoria } from '../../../models/cats';
import { RepositorioService } from '../../../services/repositorio.service';
import { Wall } from '../../../models/wall';
import { Continuacion } from '../../../models/continuacion';
import { Historia } from '../../../models/historia';
import { Paginator } from '../../../models/paginador';

@Component({
  selector: 'app-user-content-historias',
  templateUrl: './user-content-historias.component.html',
  styleUrls: ['./user-content-historias.component.scss']
})
export class UserContentHistoriasComponent implements OnInit {
  @ViewChild('contenedorBiblioteca') contenedorBiblioteca: ElementRef;
  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {

    for(let i=0; i<25; i++) {
      for(let j=0; j<10; j++) {
        let nuevaHist = new Historia();

         nuevaHist.wall = new Wall();
         nuevaHist.wall.cat = this.repositorio.categoriasAL[j];
         nuevaHist.wall.titulo = "Hola" + i;
         nuevaHist.wall.likes = 4356 + i - j;
         nuevaHist.likes = 23434 + i - j;
         nuevaHist.ranking = i + 1;
         nuevaHist.continuaciones = 234 + i - j;
         nuevaHist.texto = "Lorem ipsum dolor sit amet, consectetur adipiscing elit inum mer et eleifend porttitor, odio nulla condiment. Cras accumsan, nisl et eleifend pLorem ipsum jkdfhkjs jdshgfhkhjdgf dfjkghjkdfhjghkdf"


         this.repositorio.hists.push(nuevaHist);
      }
    }

    this.repositorio.paginadorCardsHistorias = new Paginator(this.repositorio.hists, this.contenedorBiblioteca, 12, 6);
  }



}
