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
        'nombre': 'user_preferencias_mensajes',
        'active': true
      },
      {
        'nombre': 'user_preferencias_notificaciones',
        'active': false
      }
    ];
  }

  ngOnInit() {
  }

}
