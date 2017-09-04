import { Component, OnInit, Input } from '@angular/core';
import { MessageTimePipe } from '../../pipe/message-time/message-time.pipe';
import { Usuario } from '../../models/usuario.model';
import { ChatStory } from '../../models/chatstory.model';
import { Relato } from '../../models/relato';
import { Wall } from '../../models/wall';
import { Continuacion } from '../../models/continuacion';
import { Historia } from '../../models/historia';
import { RepositorioService } from '../../services/repositorio.service';

@Component({
  selector: 'app-card-actividad-reciente',
  templateUrl: './card-actividad-reciente.component.html',
  styleUrls: ['./card-actividad-reciente.component.scss'],
})
export class CardActividadRecienteComponent implements OnInit {
  @Input() tipo:string;
  liked: boolean = false;
  tipoEntrada: number = -1;
  @Input() entrada: any;

  constructor(private repositorio: RepositorioService) { }

  ngOnInit() {
    // this.tipo = 'otros';
    // this.entrada = new Historia();
    // this.entrada.wall = new Wall();
    // this.entrada.wall.titulo = "La vida es bella";
    // this.entrada.usuario = new Usuario();
    // this.entrada.usuario.nombre = "Carlos Vanaclocha";
    // this.entrada.usuario.imagen = "https://lorempixel.com/30/30";
    // // this.entrada.categoria = this.repositorio.categoriasAL[0];
    // this.entrada.texto = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras accumsan, nisl et eleifend porttitor, odio nulla condimentum lorem, quis pellentesque mauris diam et urna. Ut augue nisi, convallis eu dui vitae, pulvinar fringilla quam. Integer nunc nibh, ultrices vitae elit sed, eleifend congue ex. Praesent interdum ante ac sapien rhoncus, ac lacinia odio suscipit. ";
    // this.entrada.likes = 37;
    // this.entrada.fechaCreacion = new Date();



    this.getType();
    // console.log(this.entrada instanceof Wall);
    // console.log(this.tipoEntrada);

  }

  meGusta() {
    if(!this.liked) {
      // document.getElementById('heart').className = 'fa fa-heart';
      this.entrada.likes++;
    }
    if(this.liked) {
      // document.getElementById('heart').className = 'fa fa-heart-o';
      this.entrada.likes--;
    }
    this.liked = !this.liked;

  }

  getColor() {
    let color = "";
    if(this.entrada instanceof Wall) color = this.entrada.cat.color;
    else if (this.entrada instanceof Relato) color = this.entrada.categoria.color;
    else if (this.entrada instanceof ChatStory) color = this.entrada.categoria;
    return color;

  }

  getType() {
    if( this.entrada instanceof Wall ) this.tipoEntrada = 0;
    else if (this.entrada instanceof Relato) this.tipoEntrada = 1;
    else if (this.entrada instanceof ChatStory) this.tipoEntrada = 2;
    else if (this.entrada instanceof Historia) this.tipoEntrada = 3;
    else if (this.entrada instanceof Continuacion) this.tipoEntrada = 4;

  }


}
