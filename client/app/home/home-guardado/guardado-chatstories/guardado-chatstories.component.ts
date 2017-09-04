import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatStory } from '../../../models/chatstory.model';
import { Paginator } from '../../../models/paginador';
import { RepositorioService } from '../../../services/repositorio.service';
import { ChatstoryService } from '../../../services/chatstory.service';
import { AuthenticationService } from '../../../services/authentication.service';
import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
@Component({
  selector: 'app-guardado-chatstories',
  templateUrl: './guardado-chatstories.component.html',
  styleUrls: ['./guardado-chatstories.component.scss']
})
export class GuardadoChatstoriesComponent implements OnInit {
  @ViewChild('div') div: ElementRef;
  chats: Array<ChatStory>;
  paginador: Paginator;
  constructor(private repositorio: RepositorioService,
              private chatservice: ChatstoryService,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,) {

  }

  ngOnInit() {

    this.chats = new Array<ChatStory>();
    const myParams = new URLSearchParams();
    myParams.append('autor', this.authenticationService.getUser().id);

    this.chatservice.getChatStoryByQueryParams(myParams).subscribe(chatStories => {
      this.chats = chatStories;
      this.paginador = new Paginator(this.chats, this.div, 18, 9);
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
