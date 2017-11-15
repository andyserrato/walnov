import {Pipe, ChangeDetectorRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AsyncPipe} from '@angular/common';
import {TranslateService} from '../../translate';

@Pipe({
  name: 'messageTime',
  pure: false
})
export class MessageTimePipe extends AsyncPipe {
  value: Date;
  timer: Observable<string>;

  constructor(ref: ChangeDetectorRef, private translate: TranslateService) {
    super(ref);
  }

  transform(obj: any, args?: any[]): any {
    if (obj instanceof Date) {
      this.value = obj;

      if (!this.timer) {
        this.timer = this.getObservable();
      }

      return super.transform(this.timer);
    }

    return super.transform(obj);
  }

  private getObservable() {
    return Observable.interval(1000).startWith(0).map(() => {
      let result: string;
      // current time
      const now = new Date().getTime();

      // time since message was sent in seconds
      const delta = (now - this.value.getTime()) / 1000;

      // format string
      if (delta < 10) {
        if (this.translate.currentLang === 'en') result = 'Right now';
        else if (this.translate.currentLang === 'es') result = 'Ahora mismo'
      }
      else if (delta < 60) { // sent in last minute
        if (this.translate.currentLang === 'en') result = Math.floor(delta) + ' seconds ago';
        else if (this.translate.currentLang === 'es') result = 'hace ' + Math.floor(delta) + ' segundos';
      }
      else if (delta < 3600) { // sent in last hour
        if (this.translate.currentLang === 'en') result = Math.floor(delta / 60) + ' minutes ago';
        else if (this.translate.currentLang === 'es') result = 'hace ' + Math.floor(delta / 60) + ' minutos';
      }
      else if (delta < 86400) { // sent on last day
        if (this.translate.currentLang === 'en') result = Math.floor(delta / 3600) + ' hours ago';
        else if (this.translate.currentLang === 'es') result = 'hace ' + Math.floor(delta / 3600) + ' horas';
      }
      else { // sent more than one day ago
        if (this.translate.currentLang === 'en') result = Math.floor(delta / 86400) + ' days ago';
        else if (this.translate.currentLang === 'es') result = 'hace ' + Math.floor(delta / 86400) + ' días';
      }
      return result;
    });
  };
}
