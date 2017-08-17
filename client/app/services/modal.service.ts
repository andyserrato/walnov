import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {

  subject: Subject<any>;
  constructor() {
    this.subject = new Subject<any>();
  }

  info(message: string) {
    this.subject.next({ type: 'info', text: message });
  }

  getMessage() {
    return this.subject.asObservable();
  }


}