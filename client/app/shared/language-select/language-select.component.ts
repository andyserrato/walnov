import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

export class Language {
  language: string;
  selected: boolean = false;
  constructor(l?: string) {
    this.language = l;
  }
}

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class LanguageSelectComponent implements OnInit {
  @ViewChild('relcontainer') relcontainer: ElementRef;
  languages: Array<Language> = new Array<Language>();
  languagesSel: Array<Language> = new Array<Language>();
  placeholder: string;
  visible: boolean;
  constructor() {
    this.placeholder="Idioma";
    this.languages.push(new Language('Español'));
    this.languages.push(new Language('Inglés'));
  }

  ngOnInit() {
  }

  select(l: Language){
    if(l.selected){
      this.languagesSel.splice(this.languagesSel.indexOf(l), 1);
    }else{
      this.languagesSel.push(l);
    }
    l.selected = !l.selected;
  }

  onClick(event) {
    if (!this.relcontainer.nativeElement.contains(event.target) && this.visible) {
      this.visible=false;
    }
  }

}
