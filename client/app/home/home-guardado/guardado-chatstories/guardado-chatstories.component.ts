import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatStory } from '../../../models/chatstory.model';
import { Paginator } from '../../../models/paginador';
import { BibliotecaService } from '../../../services/biblioteca.service';
import 'rxjs/add/operator/switchMap';
import {AuthenticationService} from "../../../services/authentication.service";
import {TranslateService} from "../../../translate/translate.service";
@Component({
  selector: 'app-guardado-chatstories',
  templateUrl: './guardado-chatstories.component.html',
  styleUrls: ['./guardado-chatstories.component.scss']
})
export class GuardadoChatstoriesComponent implements OnInit {
  @ViewChild('div') div: ElementRef;
  chats: Array<ChatStory>;
  paginador: Paginator;
  noContent = false;
  message: any;
  constructor(private bibliotecaService: BibliotecaService,
              private auth: AuthenticationService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.obtenerChatStoriesFromBiblioteca();
  }

  obtenerChatStoriesFromBiblioteca() {
    if (this.auth.isLoggedIn()) {
      this.bibliotecaService.getChatStoryBibliotecaByCurrentUserId().subscribe(chatStories => {
        if (chatStories && chatStories.chatStories && chatStories.chatStories.length > 0) {
          this.paginador = new Paginator(chatStories.chatStories, this.div, 18, 9);
        } else {
          this.showNoContent();
        }
      });
    } else {
      this.showNoContent();
    }
  }

  showNoContent() {
    this.noContent = true;
    this.message = { text: this.translate.instant('shared_no_content_ver_chatstories'),
      enlace: '/chatstories', buttonText: this.translate.instant('shared_no_content_ver_chatstories_button_text') };
  }

  }
