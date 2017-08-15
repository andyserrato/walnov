import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatStory } from '../../models/chatstory.model';
import { Paginator } from '../../models/paginador';
import { RepositorioService } from '../../services/repositorio.service';
@Component({
  selector: 'app-home-mis-chatstories',
  templateUrl: './home-mis-chatstories.component.html',
  styleUrls: ['./home-mis-chatstories.component.scss']
})
export class HomeMisChatstoriesComponent implements OnInit {
  @ViewChild('div') div: ElementRef;
  chats: Array<ChatStory>;
  paginador: Paginator;
  constructor(private repositorio: RepositorioService) {

  }

  ngOnInit() {
    this.chats = new Array<ChatStory>();
    for (let i = 0; i < 60; i++) {
      this.chats.push(new ChatStory());
      this.chats[i].titulo = 'Flipas' + i;
      this.chats[i].descripcion = 'flipas';
      this.chats[i].categoria = this.repositorio.categoriasAL[6];
      this.chats[i].urlImagen = 'http://www.lorempixel.com/63/100';
      this.chats[i].views = 0;
      this.chats[i].likes = 0;
      this.chats[i].added = false;
      this.chats[i].selected = false;
    }
    this.paginador = new Paginator(this.chats, this.div, 18, 9);
  }

}
