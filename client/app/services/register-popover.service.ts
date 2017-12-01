import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RegisterPopoverService {
  private visible: Subject<boolean> = new Subject<any>();
  redirectUrl: string;

  constructor() {
  }

  isVisible(): Observable<any> {
    return this.visible.asObservable();
  }

  setVisible(b: boolean) {
    this.visible.next(b);
  }

}
