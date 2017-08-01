import { Component, OnInit } from '@angular/core';
import { ChatStory } from '../chatstory.model';
import { AlertService } from "../../services/alert.service";
import { RepositorioService } from "../../services/repositorio.service";
import { ChatstoryMessage } from '../../models/chatstory-message';
@Component({
  selector: 'app-crear-chatstory',
  templateUrl: './crear-chatstory.component.html',
  styleUrls: ['./crear-chatstory.component.scss']
})
export class CrearChatstoryComponent implements OnInit {
  view: string;
  chatStory: ChatStory;
  constructor(private alert: AlertService, private repo: RepositorioService) {

      this.view="step1";
      this.chatStory = new ChatStory("",new Array<string>(),this.repo.categoriasAL[0],new Array<ChatstoryMessage>(),"https://www.lorempixel.com/1600/1200","",false);
  }

  ngOnInit() {

  }

  changeView(str: string, chatstory: ChatStory){
    console.log(chatstory);
    this.chatStory=chatstory;
    this.view=str;
  }

}
