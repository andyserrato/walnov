import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from '../services/modal.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  message: any;
  @ViewChild('content') content: ElementRef;
  constructor(private modal: ModalService) {
    this.modal.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  ngOnInit() {

  }

  clear(event) {
    if(!this.content.nativeElement.contains(event.target)){
      this.modal.clear();
    }
  }

}
