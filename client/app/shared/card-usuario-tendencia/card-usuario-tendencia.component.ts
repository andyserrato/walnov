import { Component, OnInit } from '@angular/core';

import { UsuarioTendecia } from './UsuarioTendencia.model'

@Component({
  selector: 'app-card-usuario-tendencia',
  templateUrl: './card-usuario-tendencia.component.html',
  styleUrls: ['./card-usuario-tendencia.component.scss']
})
export class CardUsuarioTendenciaComponent implements OnInit {
  usuarios: Array<UsuarioTendecia> = new Array<UsuarioTendecia>();

  usuario1:UsuarioTendecia;

  constructor() { }

  ngOnInit() {

    this.usuario1 = new UsuarioTendecia();
    this.usuario1.imagen = "https://lorempixel.com/22/22";
    this.usuario1.nombre = "Amorentrelineas";
    this.usuario1.walls = 13;
    this.usuario1.chatstories = 2;
    this.usuario1.relatos = 8;

    this.addUsuario(this.usuario1);


  }

  addUsuario(newUsuario: UsuarioTendecia) {
    if (newUsuario) {
        this.usuarios.push(newUsuario);

    }
  }

  deleteUsuario(oldUsuario: UsuarioTendecia){
    this.usuarios
    .splice(this.usuarios.indexOf(oldUsuario), 1);

  }


}
