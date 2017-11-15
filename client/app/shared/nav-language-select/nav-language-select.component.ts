import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from '../../translate';
import { RepositorioService } from '../../services/repositorio.service';

@Component({
  selector: 'app-nav-language-select',
  templateUrl: './nav-language-select.component.html',
  styleUrls: ['./nav-language-select.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class NavLanguageSelectComponent implements OnInit {
  visible = false;
  @ViewChild('div') div: ElementRef;
  constructor(private repositorio: RepositorioService, private translate: TranslateService) { }

  ngOnInit() {

  }

  onClick(event) {
    if (!this.div.nativeElement.contains(event.target) && this.visible) {
      this.visible = false;
    }
  }

  close() {
    this.visible = false;
  }

  changeTo(idioma) {
    this.translate.use(idioma);
    this.close();
  }

}
