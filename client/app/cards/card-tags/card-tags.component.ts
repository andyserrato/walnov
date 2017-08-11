import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-card-tags',
  templateUrl: './card-tags.component.html',
  styleUrls: ['./card-tags.component.scss']
})



export class CardTagsComponent implements OnInit {
  @Input() tags: Array<string>;
  @Input() view: string;

  constructor(private alert: AlertService) {

  }

  addTag(newTag: string) {
    if (newTag) {
      if(newTag.substring(0,).match(/[^a-zA-Z0-9]/)){
        this.alert.error('Introduce un tag válido');
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
