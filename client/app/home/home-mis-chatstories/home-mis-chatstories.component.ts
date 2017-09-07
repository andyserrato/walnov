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

  constructor(private chatservice: ChatstoryService,
              private authenticationService: AuthenticationService,
              private modalservice: ModalService) {
  }

  ngOnInit() {
    // Inicialización de variables
    this.chats = new Array<ChatStory>();
    this.modalservice.load();

    const myParams = new URLSearchParams();
    myParams.append('autor', this.authenticationService.getUser().id);
    myParams.append('sort', '-fechaCreacion');
    myParams.append('top', '20');
    myParams.append('activo', 'true');

    this.chatservice.getChatStoryByQueryParams(myParams).subscribe(chatStories => {
      this.chats = chatStories;
      this.paginador = new Paginator(this.chats, this.div, 18, 9);
      this.modalservice.clear();
      this.visible = true;
    }, error => {
      this.modalservice.clear();
    });

  }

}
