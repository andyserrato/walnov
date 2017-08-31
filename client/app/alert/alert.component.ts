import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { CapitalizePipe } from '../pipe/capitalize/capitalize.pipe';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message: any;
  typeText: any;
  @ViewChild('alertBox') alertBox: ElementRef;
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {
       this.message = message;
     });
  }
  clear() {
    this.alertService.clear();
  }
}
