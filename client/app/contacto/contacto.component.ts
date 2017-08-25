import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {
  lat: number = 39.4793903;
  lng: number = -0.3352874;

  constructor() { }

  ngOnInit() {
  }

  // myMap() {
  //   let mapOptions = {
  //       center: new google.maps.LatLng(51.5, -0.12),
  //       zoom: 10,
  //       mapTypeId: google.maps.MapTypeId.HYBRID
  //   }
  //   let map = new google.maps.Map(document.getElementById("map"), mapOptions);
  // }

}
