import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {ChatstoryService} from '../../services/chatstory.service';
import {ChatStory} from '../../models/chatstory.model';

@Component({
  selector: 'app-mis-chatstories',
  templateUrl: './mis-chatstories.component.html',
  styleUrls: ['./mis-chatstories.component.scss']
})
export class MisChatstoriesComponent implements OnInit {
  showMessage: boolean;
  chatStories: ChatStory[];

  constructor(private authenticationService: AuthenticationService, private chatStoryService: ChatstoryService) {}

  ngOnInit() {
    if (this.authenticationService.isLoggedIn()) {
      this.getChatStoriesPublicadosPorAutor();
    } else {
      this.showMessage = true;
    }
  }

  getChatStoriesPublicadosPorAutor() {
    const myParams = new URLSearchParams();
    myParams.append('autor', this.authenticationService.getUser().id);
    myParams.append('sort', '-fechaCreacion');
    myParams.append('top', '8');
    myParams.append('activo', 'true');
    myParams.append('tipo', '0'); // tipo publicado
    this.chatStoryService.getChatStoryByQueryParams(myParams).subscribe(
      chatStories => {
        if (chatStories && chatStories.length > 0) {
          this.chatStories = chatStories;
        } else {
          this.showMessage = true;
        }
      }
    );
  }
}
