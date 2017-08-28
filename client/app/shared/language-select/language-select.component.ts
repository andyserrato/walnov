import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { SelectItem } from '../../models/select-item';

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
  @Input() languages: Array<SelectItem>;
  languagesSel: Array<SelectItem> = new Array<SelectItem>();
  ph: string;
  visible: boolean;
  @Input() placeholder: string;
  constructor() {

  }

  ngOnInit() {
    this.ph=this.placeholder;
  }

  editPlaceholder() {
    this.ph="";
    if(this.languagesSel.length>0){
      for(let i=0; i< this.languagesSel.length; i++){
        this.ph+=this.languagesSel[i].text;
        if(i<this.languagesSel.length-1) {
          this.ph+=", ";
        }
      }
    }else{
      this.ph=this.placeholder;
    }

  }

  select(l: SelectItem){
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
