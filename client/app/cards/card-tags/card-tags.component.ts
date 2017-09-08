import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { TranslateService } from '../../translate';
@Component({
  selector: 'app-card-tags',
  templateUrl: './card-tags.component.html',
  styleUrls: ['./card-tags.component.scss']
})



export class CardTagsComponent implements OnInit {
  @Input() tags: Array<string>;
  @Input() view: string;

  constructor(private alert: AlertService, private translate: TranslateService) {

  }

  addTag(newTag: string) {
    if (newTag) {
      if(newTag.substring(0,).match(/[^a-zA-Z0-9]/)){
        this.alert.error(this.translate.instant('alert_card_tags'));
        return true;
      }
      else{
        this.tags.push(newTag);
      }
    }
  }

  deleteTag(oldTag: string){
    this.tags.splice(this.tags.indexOf(oldTag), 1);

  }

  ngOnInit() {
  }
}
