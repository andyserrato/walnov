import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-account-preferences',
  templateUrl: './user-account-preferences.component.html',
  styleUrls: ['./user-account-preferences.component.scss']
})
export class UserAccountPreferencesComponent implements OnInit {
  preferencias: any;
  constructor() {
    this.preferencias = [
      {
        'nombre': 'Mensajes',
        'active': true
      },
      {
        'nombre': 'Notificaciones',
        'active': false
      }
    ];
  }

  ngOnInit() {
  }

}
