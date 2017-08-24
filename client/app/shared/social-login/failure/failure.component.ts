import { Component, OnInit } from '@angular/core';
import {AlertService} from '../../../services/alert.service';
import {WindowService} from '../../../services/window.service';

@Component({
  selector: 'app-failure',
  templateUrl: './failure.component.html',
  styleUrls: ['./failure.component.scss']
})
export class FailureComponent implements OnInit {

  constructor(private alertService: AlertService, private windowService: WindowService) {
    this.alertService.error('Ha ocurrido un error');
  }

  ngOnInit() {
    this.closeWindowTimer();
  }

  closeWindowTimer() {
    window.setTimeout(() => {
      this.windowService.nativeWindow.close();
    }, 3000);
  }

}
