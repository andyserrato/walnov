import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatStory } from '../../../models/chatstory.model';
import { Paginator } from '../../../models/paginador';
import { RepositorioService } from '../../../services/repositorio.service';
import { ChatstoryService } from '../../../services/chatstory.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { TranslateService } from '../../../translate';
import 'rxjs/add/operator/switchMap';
import { ModalService } from '../../../services/modal.service';
import { AlertService } from '../../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-content-chatstories',
  templateUrl: './user-content-chatstories.component.html',
  styleUrls: ['./user-content-chatstories.component.scss']
})
export class UserContentChatstoriesComponent implements OnInit {
  @ViewChild('div') div: ElementRef;
  chats: Array<any>;
  user:any;
  library: boolean;
  paginador: Paginator;
  visible = false;
  skip = 0;

  constructor(private chatservice: ChatstoryService,
              private authenticationService: AuthenticationService,
              private repositorio: RepositorioService,
              private modalservice: ModalService,
              private translate: TranslateService,
              private userService: UserService, private route: ActivatedRoute, private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.chats = new Array<any>();
    if(this.authenticationService.isLoggedIn()) {
      this.library = this.authenticationService.getUser().id != this.repositorio.idUsuario;
    }
    else {
      this.library = true;
    }
    // console.log(this.library);
    if(this.repositorio.idUsuario) {
      this.firstQuery();
    }



  }

  firstQuery() {
    this.modalservice.load();
    // this.paginador = new Paginator(this.chats, this.div, 27, 9);
    const myParams = new URLSearchParams();
    myParams.append('autor', this.repositorio.idUsuario);
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
    myParams.append('autor', this.repositorio.idUsuario);
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
        this.alertService.warning(this.translate.instant('alert_chatstory_acabados_2'));
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
