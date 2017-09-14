import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatStory } from '../../models/chatstory.model';
import { Paginator } from '../../models/paginador';
import { ChatstoryService } from '../../services/chatstory.service';
import { AuthenticationService } from '../../services/authentication.service';
import { TranslateService } from '../../translate';
import 'rxjs/add/operator/switchMap';
import { ModalService } from '../../services/modal.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-home-mis-chatstories',
  templateUrl: './home-mis-chatstories.component.html',
  styleUrls: ['./home-mis-chatstories.component.scss']
})
export class HomeMisChatstoriesComponent implements OnInit {
  @ViewChild('div') div: ElementRef;
  chats: Array<any>;
  paginador: Paginator;
  visible = false;
  skip = 0;
  constructor(private chatservice: ChatstoryService,
              private translate: TranslateService,
              private authenticationService: AuthenticationService,
              private modalservice: ModalService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    // Inicialización de variables
    this.chats = new Array<any>();
    if(this.authenticationService.isLoggedIn()) {
      this.firstQuery();
    }

  }

  firstQuery() {
    this.modalservice.load();
    // this.paginador = new Paginator(this.chats, this.div, 27, 9);
    const myParams = new URLSearchParams();
    myParams.append('autor', this.authenticationService.getUser().id);
    myParams.append('sort', '-fechaCreacion');
    myParams.append('top', '27');
    myParams.append('skip', this.skip+'');
    myParams.append('activo', 'true');

    this.chatservice.getChatStoryByQueryParams(myParams).subscribe(chatStories => {
      this.chats = chatStories;
      this.paginador = new Paginator(this.chats, this.div, 27, 9);
      console.log(chatStories);
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
      if(chatStories.length>0){
        this.chats = chatStories;
        for(let c of chatStories) {
          this.paginador.paginador.push(c);
        }
        this.paginador.paginarDelante();
        this.paginador.final=false;
        this.modalservice.clear();
        this.visible = true;
        this.skip += 27;
      } else {
        this.modalservice.clear();
        this.alertService.warning(this.translate.instant('alert_chatstory_acabados'));
        this.paginador.final=false;
      }

    }, error => {
      this.modalservice.clear();
    });
  }

  scrollTop() {
    this.paginador.container.nativeElement.scrollTop = 0;
  }

}
