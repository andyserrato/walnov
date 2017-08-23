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
    this.placeholder="Idiomas";
    this.languages.push(new Language('Español'));
    this.languages.push(new Language('Inglés'));
    this.languages.push(new Language('Francés'));
    this.languages.push(new Language('Portugués'));
    this.languages.push(new Language('Chino'));
    this.languages.push(new Language('Japonés'));
    this.languages.push(new Language('Italiano'));
    this.languages.push(new Language('Ruso'));
  }

  ngOnInit() {
  }

  editPlaceholder() {
    this.placeholder="";
    if(this.languagesSel.length>0){
      for(let i=0; i< this.languagesSel.length; i++){
        this.placeholder+=this.languagesSel[i].language;
        if(i<this.languagesSel.length-1) {
          this.placeholder+=", ";
        }
      }
    }else{
      this.placeholder="Idiomas";
    }

  }

  select(l: Language){
    if(l.selected){
      this.languagesSel.splice(this.languagesSel.indexOf(l), 1);
    }else{
      this.languagesSel.push(l);
    }
    l.selected = !l.selected;
    this.editPlaceholder();
  }

  onClick(event) {
    if (!this.relcontainer.nativeElement.contains(event.target) && this.visible) {
      this.visible=false;
    }
  }

}
