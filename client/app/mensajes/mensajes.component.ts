import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {
  mensajes: any;
  personas: Array<any>;
  selected: any;
  constructor() {
  }

  ngOnInit() {
    this.personas=[
      { 'user': 'Usuario 1',
        'chat': [
          {'user': 'Usuario 1',
            'text': 'Hola, que tal?',
            'hour': new Date()},
          {'user': 'yo',
            'text': 'Aquí, probando los mensajes',
            'hour': new Date()}
        ]
      },
      { 'user': 'Usuario 2',
      'chat': [
        {'user': 'Usuario 2',
          'text': 'Pues se ha quedado buen dia al final',
          'hour': new Date()},
        {'user': 'yo',
          'text': 'Razón no te falta la verdad',
          'hour': new Date()}
      ]
    }
    ];
  }

  select(event: any) {
    console.log(event);
    this.selected=event;
    this.mensajes=event.chat;
  }

  newMessage(event: any) {
    this.personas.find(r => r.user === this.selected.user).chat.push(event);
  }

}
