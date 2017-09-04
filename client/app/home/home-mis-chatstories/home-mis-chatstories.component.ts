import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatStory } from '../../models/chatstory.model';
import { Paginator } from '../../models/paginador';
import { RepositorioService } from '../../services/repositorio.service';
import { ChatstoryService } from '../../services/chatstory.service';
import { AuthenticationService } from '../../services/authentication.service';
import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-home-mis-chatstories',
  templateUrl: './home-mis-chatstories.component.html',
  styleUrls: ['./home-mis-chatstories.component.scss']
})
export class HomeMisChatstoriesComponent implements OnInit {
  @ViewChild('div') div: ElementRef;
  chats: Array<ChatStory>;
  paginador: Paginator;
  visible: boolean = false;

  constructor(private repositorio: RepositorioService,
              private chatservice: ChatstoryService,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private modalservice: ModalService) {
  }

  ngOnInit() {

    this.chats = new Array<ChatStory>();
    const myParams = new URLSearchParams();
    myParams.append('autor', this.authenticationService.getUser().id);
    this.modalservice.load();
    this.chatservice.getChatStoryByQueryParams(myParams).subscribe(chatStories => {
      this.chats = chatStories;
      this.paginador = new Paginator(this.chats, this.div, 18, 9);
      this.modalservice.clear();
      this.visible = true;
    });
    //   this.chats.push(new ChatStory());
    //   this.chats[i].titulo = 'Flipas' + i;
    //   this.chats[i].descripcion = 'flipas';
    //   this.chats[i].categoria = this.repositorio.categoriasAL[6];
    //   this.chats[i].urlImagen = 'http://www.lorempixel.com/63/100';
    //   this.chats[i].views = 0;
    //   this.chats[i].likes = 0;
    //   this.chats[i].added = false;
    //   this.chats[i].selected = false;
    // }

  }

}
