import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chatstory } from '../../../models/chatstory.model';
import { Paginator } from '../../../models/paginador';
import { RepositorioService } from '../../../services/repositorio.service';
@Component({
  selector: 'app-guardado-chatstories',
  templateUrl: './guardado-chatstories.component.html',
  styleUrls: ['./guardado-chatstories.component.scss']
})
export class GuardadoChatstoriesComponent implements OnInit {
  @ViewChild('div') div: ElementRef;
  chats: Array<Chatstory>;
  paginador: Paginator;
  constructor(private repositorio: RepositorioService) {

  }

  ngOnInit() {
    this.chats=new Array<Chatstory>();
    for(var i = 0; i<60; i++){
      this.chats.push(new Chatstory());
      this.chats[i].titulo="Flipas"+i;
      this.chats[i].descripcion="flipas";
      this.chats[i].categoria=this.repositorio.categoriasAL[6];
      this.chats[i].imagen_url="http://www.lorempixel.com/63/100";
      this.chats[i].views=0;
      this.chats[i].likes=0;
      this.chats[i].added=false;
      this.chats[i].selected=false;
    }
    this.paginador=new Paginator(this.chats, this.div, 18, 9);
  }

  }
