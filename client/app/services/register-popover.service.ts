import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RegisterPopoverService {
  private visible: Subject<boolean> = new Subject<any>();
  private keepAfterNavigationChange = false;
  constructor(private router: Router) {
      // // clear alert message on route change
      // router.events.subscribe(event => {
      //     if (event instanceof NavigationStart) {
      //         if (this.keepAfterNavigationChange) {
      //             // only keep for a single location change
      //             this.keepAfterNavigationChange = false;
      //         } else {
      //             // clear alert
      //             this.visible.next();
      //         }
      //     }
      // });
  }

  isVisible(): Observable<any> {
    return this.visible.asObservable();
  }

  setVisible(b: boolean){
    this.visible.next(b);
    console.log(b);
  }

}
