import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { DateformatPipe } from '../dateformat.pipe';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() mensajes: any;
  @Output() nuevoMensaje: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('textomensaje') input: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  newMessage(value: any) {
    let date = new Date();
    // En lugar de guardar un string en el user guardaremos el id del usuario al que pertenece el mensaje
    this.nuevoMensaje.emit({
      'user': 'yo',
      'text': value,
      'hour': date
    });
    this.input.nativeElement.value = "";
  }

}
