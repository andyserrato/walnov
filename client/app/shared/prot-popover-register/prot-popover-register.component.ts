import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-prot-popover-register',
  templateUrl: './prot-popover-register.component.html',
  styleUrls: ['./prot-popover-register.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class ProtPopoverRegisterComponent implements OnInit {
  visible: boolean = false;
  @ViewChild('div') div: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  onClick(event) {
    if (!this.div.nativeElement.contains(event.target) && this.visible) {
      this.visible = true;
    }
  }

}
