import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatStory } from '../../../models/chatstory.model';
import { Paginator } from '../../../models/paginador';
import { BibliotecaService } from '../../../services/biblioteca.service';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-guardado-chatstories',
  templateUrl: './guardado-chatstories.component.html',
  styleUrls: ['./guardado-chatstories.component.scss']
})
export class GuardadoChatstoriesComponent implements OnInit {
  @ViewChild('div') div: ElementRef;
  chats: Array<ChatStory>;
  paginador: Paginator;
  constructor(private bibliotecaService: BibliotecaService) { }

  ngOnInit() {
    this.bibliotecaService.getBibliotecaByCurrentUserId().subscribe(biblioteca => {
      this.bibliotecaService.updateBiblioteca(biblioteca);
      this.paginador = new Paginator(this.bibliotecaService.getCurrentBiblioteca().chatStories, this.div, 18, 9);
    });

  }

  }
