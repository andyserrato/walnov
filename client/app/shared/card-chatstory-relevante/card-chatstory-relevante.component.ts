import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import { RepositorioService } from '../../services/repositorio.service';
// import { AuthenticationService } from '../../services/authentication.service';
import { ChatstoryService } from '../../services/chatstory.service';
import { ChatStory } from '../../models/chatstory.model';
// import { RegisterPopoverService } from '../../services/register-popover.service';
// import { BibliotecaService } from '../../services/biblioteca.service';
//import { TranslateService } from '../../translate/translate.service';

@Component({
  selector: 'app-card-chatstory-relevante',
  templateUrl: './card-chatstory-relevante.component.html',
  styleUrls: ['./card-chatstory-relevante.component.scss']
})
export class CardChatstoryRelevanteComponent implements OnInit {
  chatstories: ChatStory[];

  constructor(private repositorio: RepositorioService,
              private router: Router,
              private chatstoryService: ChatstoryService) { }
              //private poopoverService: RegisterPopoverService,
              //private authenticationService: AuthenticationService,
              //private bibliotecaService: BibliotecaService

  ngOnInit() {
    const myParams = new URLSearchParams();
    myParams.append('sort', '-fechaCreacion');
    myParams.append('top', '5');
    myParams.append('activo', 'true');
    myParams.append('tipo', '0'); // tipo publicado
    this.chatstoryService.getChatStoryByQueryParams(myParams).subscribe(
      chatStories => {
        if (chatStories && chatStories.length > 0) {
          this.chatstories = chatStories;
        } else {
          console.log("No hay chatstories relevantes.");
        }
      }
    );

    setInterval(this.showAnother.bind(this), 30000,);

  }

  showAnother() {
    let chatstory = this.chatstories[0];
    this.chatstories.splice(0,1);
    this.chatstories.push(chatstory);

  }

  loadChatstory(chatstory) {
    this.router.navigate(['/chatstory/'+chatstory.id]);
  }

  getBorder(chatstory: any) {
    return 'solid 1.5px ' + this.repositorio.categoriasHM.get(chatstory.categoria).color;

  }

  getColor(chatstory: any) {
    return this.repositorio.categoriasHM.get(chatstory.categoria).color;

  }

}
