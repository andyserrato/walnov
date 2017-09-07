import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatStory } from '../../models/chatstory.model';
import { Paginator } from '../../models/paginador';
import { ChatstoryService } from '../../services/chatstory.service';
import { AuthenticationService } from '../../services/authentication.service';
import 'rxjs/add/operator/switchMap';
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
  visible = false;
  skip = 0;
  constructor(private chatservice: ChatstoryService,
              private authenticationService: AuthenticationService,
              private modalservice: ModalService) {
  }

  ngOnInit() {
    // Inicialización de variables
    this.chats = new Array<ChatStory>();
    // if(this.authenticationService.isLoggedIn()) {
    //   this.firstQuery();
    // }

  }

  firstQuery() {
    this.modalservice.load();
    this.paginador = new Paginator(this.chats, this.div, 27, 9);
    const myParams = new URLSearchParams();
    myParams.append('autor', this.authenticationService.getUser().id);
    myParams.append('sort', '-fechaCreacion');
    myParams.append('top', '27');
    myParams.append('skip', this.skip+'');
    myParams.append('activo', 'true');

    this.chatservice.getChatStoryByQueryParams(myParams).subscribe(chatStories => {
      this.chats = chatStories;
      this.paginador = new Paginator(this.chats, this.div, 27, 9);
      this.modalservice.clear();
      this.visible = true;
      this.skip += 27;
    }, error => {
      this.modalservice.clear();
    });
  }

  loadMore() {
    this.modalservice.load();
    const myParams = new URLSearchParams();
    myParams.append('autor', this.authenticationService.getUser().id);
    myParams.append('sort', '-fechaCreacion');
    myParams.append('top', '27');
    myParams.append('skip', this.skip+'');
    myParams.append('activo', 'true');

    this.chatservice.getChatStoryByQueryParams(myParams).subscribe(chatStories => {
      this.chats = chatStories;
      for(let c of chatStories) {
        this.paginador.paginador.push(c);
      }
      this.paginador.paginarDelante();
      this.paginador.final=false;
      this.modalservice.clear();
      this.visible = true;
      this.skip += 27;
    }, error => {
      this.modalservice.clear();
    });
  }

}
