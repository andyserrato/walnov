import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { TranslateService } from '../../translate';
@Component({
  selector: 'app-card-tags',
  templateUrl: './card-tags.component.html',
  styleUrls: ['./card-tags.component.scss']
})



export class CardTagsComponent implements OnInit {
  @Input() tags: Array<string>;
  @Input() view: string;
  tagForm: FormControl;

  constructor(private alert: AlertService, private translate: TranslateService) {
    this.tagForm = new FormControl();
    this.tagForm.setValidators(Validators.compose([Validators.required, Validators.maxLength(15)]));
  }

  addTag(event) {
    // console.log(event.value);
    if (this.tagForm.valid) {
      if(this.tags.indexOf(event.value) === -1) {
        if(event.value.substring(0,).match(/[^a-zA-Z0-9]/)){
          this.alert.error(this.translate.instant('alert_card_tags'));
        } else {
          this.tags.push(event.value);
        }
      } else {
        this.alert.warning(this.translate.instant('alert_card_tags_3'));
      }
      event.value = '';
    } else {
      this.alert.warning(this.translate.instant('alert_card_tags_2'));
    }
  }

  deleteTag(event){
    this.tags.splice(this.tags.indexOf(event), 1);

  }

  ngOnInit() {
  }
}
