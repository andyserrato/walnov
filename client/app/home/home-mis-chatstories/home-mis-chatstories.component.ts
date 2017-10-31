import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Paginator } from '../../models/paginador';
import { ChatstoryService } from '../../services/chatstory.service';
import { AuthenticationService } from '../../services/authentication.service';
import { BibliotecaService } from '../../services/biblioteca.service';
import { TranslateService } from '../../translate';
import 'rxjs/add/operator/switchMap';
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
  noContent = false;
  message: any;

  constructor(private chatservice: ChatstoryService,
              private translate: TranslateService,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private bibliotecaService: BibliotecaService) {
  }

  ngOnInit() {
    // Inicialización de variables
    this.chats = new Array<any>();
    this.paginador = new Paginator(this.chats, this.div, 27, 9);
    if (this.authenticationService.isLoggedIn()) {
      this.firstQuery();
    } else {
      this.showNoContent();
    }

  }

  firstQuery() {
    const myParams = new URLSearchParams();
    myParams.append('autor', this.authenticationService.getUser().id);
    myParams.append('sort', '-fechaCreacion');
    myParams.append('top', '27');
    myParams.append('skip', this.skip + '');
    myParams.append('activo', 'true');

    this.chatservice.getChatStoryByQueryParams(myParams).subscribe(chatStories => {
      if (chatStories && chatStories.length > 0) {
        this.chats = chatStories;
        if (!this.bibliotecaService.getCurrentBiblioteca()) {
          this.bibliotecaService.getBibliotecaByCurrentUserId().subscribe(biblioteca => {
            this.bibliotecaService.updateBiblioteca(biblioteca);
            this.paginador = new Paginator(this.chats, this.div, 27, 9);
            this.visible = true;
            this.skip += 27;
          });
        } else {
          this.paginador = new Paginator(this.chats, this.div, 27, 9);
          this.visible = true;
          this.skip += 27;
        }
      } else {
        this.showNoContent();
      }
    }, error => {
    });
  }

  loadMore() {
    const myParams = new URLSearchParams();
    myParams.append('autor', this.authenticationService.getUser().id);
    myParams.append('sort', '-fechaCreacion');
    myParams.append('top', '27');
    myParams.append('skip', this.skip + '');
    myParams.append('activo', 'true');

    this.chatservice.getChatStoryByQueryParams(myParams).subscribe(chatStories => {
      if (chatStories.length > 0) {
        this.chats = chatStories;
        for (const c of chatStories) {
          this.paginador.paginador.push(c);
        }
        this.paginador.paginarDelante();
        this.paginador.final = false;
        this.visible = true;
        this.skip += 27;
      } else {
        this.alertService.warning(this.translate.instant('alert_chatstory_acabados'));
        this.paginador.final = false;
      }

    }, error => {
    });
  }

  scrollTop() {
    this.paginador.container.nativeElement.scrollTop = 0;
  }

  showNoContent() {
    this.noContent = true;
    this.message = { text: this.translate.instant('shared_no_content_ver_chatstories'),
      enlace: '/chatstories', buttonText: this.translate.instant('shared_no_content_ver_chatstories_button_text') };
  }

}
