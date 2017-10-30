import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Paginator} from '../../../models/paginador';
import {RepositorioService} from '../../../services/repositorio.service';
import {ChatstoryService} from '../../../services/chatstory.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {BibliotecaService} from '../../../services/biblioteca.service';
import {TranslateService} from '../../../translate';
import 'rxjs/add/operator/switchMap';
import {AlertService} from '../../../services/alert.service';

@Component({
  selector: 'app-user-content-chatstories',
  templateUrl: './user-content-chatstories.component.html',
  styleUrls: ['./user-content-chatstories.component.scss']
})
export class UserContentChatstoriesComponent implements OnInit {
  @ViewChild('div') div: ElementRef;
  chats: Array<any>;
  library: boolean;
  paginador: Paginator;
  visible = false;
  skip = 0;
  noContent = false;
  message: any;

  constructor(private chatservice: ChatstoryService,
              private authenticationService: AuthenticationService,
              private repositorio: RepositorioService,
              private translate: TranslateService,
              private alertService: AlertService,
              private bibliotecaService: BibliotecaService) {
  }

  ngOnInit() {
    // todo obtención del id por la url estaría bien
    this.chats = new Array<any>();
    if (this.authenticationService.isLoggedIn()) {
      this.library = this.authenticationService.getUser().id !== this.repositorio.idUsuario;
    } else {
      this.library = true;
    }

    if (this.repositorio.idUsuario) {
      this.firstQuery();
    } else {
      this.showNoContent();
    }
  }

  firstQuery() {
    const myParams = new URLSearchParams();
    myParams.append('autor', this.repositorio.idUsuario);
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
    myParams.append('autor', this.repositorio.idUsuario);
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
        this.alertService.warning(this.translate.instant('alert_chatstory_acabados_2'));
        this.paginador.final = false;
      }

    }, error => {
    });
  }

  scrollTop() {
    this.paginador.container.nativeElement.scrollTop = 0;
  }

  showNoContent() {
    // todo cambiar mensaje
    this.noContent = true;
    this.message = {
      text: this.translate.instant('shared_no_content_ver_chatstories'),
      enlace: '/chatstories', buttonText: this.translate.instant('shared_no_content_ver_chatstories_button_text')
    };
  }

}
