import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatStory} from '../../models/chatstory.model';
import {AlertService} from '../../services/alert.service';
import {RepositorioService} from '../../services/repositorio.service';
import {ChatstoryMessage} from '../../models/chatstory-message';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {ChatstoryService} from '../../services/chatstory.service';
import {TranslateService} from '../../translate/translate.service';

import { CardInformativoComponent } from '../../shared/card-informativo/card-informativo.component';
@Component({
  selector: 'app-crear-chatstory',
  templateUrl: './crear-chatstory.component.html',
  styleUrls: ['./crear-chatstory.component.scss']
})
export class CrearChatstoryComponent implements OnInit, OnDestroy {
  view: string;
  chatStory: any;
  private subscription: Subscription;

  constructor(private alert: AlertService,
              private repo: RepositorioService,
              private route: ActivatedRoute,
              private chatStoryService: ChatstoryService,
              private translate: TranslateService) {
    this.instanciarNuevoChatStory();
    this.view = 'step1';
  }

  ngOnInit() {
    this.getChatStoryBorrador();
  }

  changeView(str: string, chatstory: ChatStory) {
    this.chatStory = chatstory;
    this.view = str;
  }

  getChatStoryBorrador() {
    this.subscription = this.route.params.subscribe(
      params => {
        const id = params['id'];
        if (id !== '0') {
          this.chatStoryService.getChatStory(id).subscribe(chatStory => {
              this.chatStory = chatStory;
              this.chatStory.categoria = this.repo.getCategoriaALByName(this.chatStory.categoria);
            },
            error => {
              this.alert.error(this.translate.instant('alert_borrador_no_encontrado'));
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  instanciarNuevoChatStory() {
    this.chatStory = new ChatStory('', new Array<string>(), this.repo.categoriasAL[0],
      new Array<ChatstoryMessage>(), 'https://www.lorempixel.com/1600/1200', '', false);
  }

  getInfoCard() {
    return CardInformativoComponent.showCard;
  }

}
