import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from '../services/modal.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  message: any;
  isCopied = false;
  @ViewChild('content') content: ElementRef;
  constructor(private modal: ModalService, private router: Router) {

  }

  ngOnInit() {
    this.modal.getMessage().subscribe(message => {
      this.message = message;
      this.message.enlaceCopiar = location.origin + message.enlace;
    });
  }

  clear() {
      this.modal.clear();
  }

  clearAndNavigate() {
    this.router.navigate([this.message.enlace]);
    this.clear();
  }

  copy() {
    const target = document.getElementById('copyToClipboard');
    console.log('target');
    console.log(target);
    let range, select;
    if (document.createRange) {
      console.log('range creado');
      this.isCopied = true;
      range = document.createRange();
      range.selectNode(target);
      select = window.getSelection();
      select.addRange(range);
      window.setTimeout(() => {
          document.execCommand('copy');
          select.removeAllRanges();
          this.isCopied = false;
        }, 1000
      );
     }
  }

}
