import { Component, OnInit } from '@angular/core';
import { RepositorioService } from '../../services/repositorio.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-card-buscador-personas',
  templateUrl: './card-buscador-personas.component.html',
  styleUrls: ['./card-buscador-personas.component.scss']
})
export class CardBuscadorPersonasComponent implements OnInit {
  // usuarios: Array<Usuario>;
  vacio: boolean = true;

  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {
    // this.usuarios = new Array();
    // for(let i=0; i<10; i++) {
    //   let nuevoUsuario = new Usuario();
    //   nuevoUsuario.nombre = "Usuario" + i;
    //   nuevoUsuario.imagen = "https://lorempixel.com/40/40";
    //   nuevoUsuario.walls = 23;
    //   nuevoUsuario.chatstories = 4;
    //   nuevoUsuario.relatos = 8;
    //   nuevoUsuario.seguido = true;
    //   this.usuarios.push(nuevoUsuario);
    // }

  }

  isUsuario(usuario) {
    if( usuario instanceof Usuario ) {this.vacio = false; return 0;}
    else return -1;

  }

  follow(usuario: Usuario) {
    usuario.seguido = !usuario.seguido;
  }

}
