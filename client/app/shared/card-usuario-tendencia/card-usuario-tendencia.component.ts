import { Component, OnInit } from '@angular/core';

import { UsuarioTendecia } from '../../models/UsuarioTendencia.model'

@Component({
  selector: 'app-card-usuario-tendencia',
  templateUrl: './card-usuario-tendencia.component.html',
  styleUrls: ['./card-usuario-tendencia.component.scss']
})
export class CardUsuarioTendenciaComponent implements OnInit {
  usuarios: Array<UsuarioTendecia> = new Array<UsuarioTendecia>();

  usuario1:UsuarioTendecia;
  usuario2:UsuarioTendecia;
  usuario3:UsuarioTendecia;

  constructor() { }

  ngOnInit() {
    this.usuario1 = new UsuarioTendecia();
    this.usuario1.imagen = "https://lorempixel.com/22/22";
    this.usuario1.nombre = "Amorentrelineas";
    this.usuario1.walls = 13;
    this.usuario1.chatstories = 2;
    this.usuario1.relatos = 8;
    this.usuario1.visible = true;

    this.usuario2 = new UsuarioTendecia();
    this.usuario2.imagen = "https://lorempixel.com/22/22";
    this.usuario2.nombre = "SeñorX";
    this.usuario2.walls = 16;
    this.usuario2.chatstories = 24;
    this.usuario2.relatos = 3;

    this.usuario3 = new UsuarioTendecia();
    this.usuario3.imagen = "https://lorempixel.com/22/22";
    this.usuario3.nombre = "CarloAncelloti";
    this.usuario3.walls = 6;
    this.usuario3.chatstories = 14;
    this.usuario3.relatos = 9;

    this.addUsuario(this.usuario1);
    this.addUsuario(this.usuario2);
    this.addUsuario(this.usuario3);

  }

  ngAfterViewInit() {    

  }

  addUsuario(newUsuario: UsuarioTendecia) {
    if (newUsuario) {
        this.usuarios.push(newUsuario);

    }

  }

  deleteUsuario(oldUsuario: UsuarioTendecia) {
    this.usuarios
    .splice(this.usuarios.indexOf(oldUsuario), 1);

  }

  showAnother(previousUsuario: UsuarioTendecia) {
    previousUsuario.visible = false;
    var position = this.usuarios.indexOf(previousUsuario);
    if(position === (this.usuarios.length - 1)) position = -1;
    this.usuarios[position + 1].visible = true;

  }

}
