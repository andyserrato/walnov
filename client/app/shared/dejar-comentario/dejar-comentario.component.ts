import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-dejar-comentario',
  templateUrl: './dejar-comentario.component.html',
  styleUrls: ['./dejar-comentario.component.scss']
})
export class DejarComentarioComponent implements OnInit {
  user: Usuario;
  localComent: string;
  @Output() userOut: EventEmitter<Usuario>;
  @Output() comentario: EventEmitter<String>;
  constructor() {
    this.comentario = new EventEmitter();
    this.userOut = new EventEmitter();
  }

  ngOnInit() {
    this.user = new Usuario();
    this.user.imagen = "https://lorempixel.com/30/30";
    this.user.nombre = "Amorentrelineas";

    this.localComent = "";
  }

 publicaComentario(event) {
   this.comentario.emit(this.localComent);
   this.userOut.emit(this.user);
   this.localComent = "";

 }

}
