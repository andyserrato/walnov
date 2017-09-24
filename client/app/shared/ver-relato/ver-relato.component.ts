import { Component, OnInit, Input  } from '@angular/core';
import { Relato } from '../../models/relato.model';
import { Usuario } from '../../models/usuario.model';
import { RepositorioService } from '../../services/repositorio.service';
import {AuthenticationService} from "../../services/authentication.service";
import {RelatoService} from "../../services/relato.service";
import {RegisterPopoverService} from "../../services/register-popover.service";

@Component({
  selector: 'app-ver-relato',
  templateUrl: './ver-relato.component.html',
  styleUrls: ['./ver-relato.component.scss']
})
export class VerRelatoComponent implements OnInit {
  @Input() relato: any;
  opinionWriter: Usuario;
  comentarios = Array<String>();
  added = false; // se pone a true cuando el relato es añadido a la lista
  constructor(private repositorio: RepositorioService,
              private auth: AuthenticationService,
              private relatoService: RelatoService,
              private popOverService: RegisterPopoverService) { }

  ngOnInit() {
    console.log(this.relato);
    // this.relato = new Relato();
    //
    // this.relato.categoria = this.repositorio.categoriasAL[0];
    // this.relato.titulo = 'Los andares perdidos';
    // this.relato.urlImagen = 'https://lorempixel.com/253/318';
    // this.relato.coments = 200324;
    // this.relato.resumen = 'Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. ';
    // this.relato.likes = 784;
    // this.relato.views = 2000;
    //
    // this.relato.usuario = new Usuario();
    // this.relato.usuario.nombre = 'Amorentrelineas';
    // this.relato.usuario.walls = 14;
    // this.relato.usuario.chatstories = 12;
    // this.relato.usuario.relatos = 8;
    // this.relato.usuario.imagen = 'https://lorempixel.com/22/22';
    //
    // this.relato.contenido = new Array<string>();
    //
    // this.relato.contenido.push('No había mañana aún, cuando con mucho cuidado ordenó los hilos.');
    // this.relato.contenido.push('Uno a uno, color por color, grosor por grosor, quedaron sobre la piedra distribuidos. ' +
    //   'Preparó el rollo de la urdimbre y fue colocando cada hilo en su lugar. Debía ser preciso, solo una vez podría hacerlo.');
    // this.relato.contenido.push('No había sol aún, cuando montó las lisas en el cuadro y el plegador al final.');
    // this.relato.contenido.push('Enrolló los hilos en orden para que el tejido fuese fuerte y flexible. ' +
    //   'Distribuyó el grosor para que ello se cumpliera y no fallara en el momento de tejer. Debía ser preciso, solo esta vez lo haría.');
    // this.relato.contenido.push('La luna no plateaba ninguna noche, porque noche no había aún.');
    // this.relato.contenido.push('Enhebró cada lisa de acuerdo al cuadro que le correspondía. Anudó el hilo al plegador y lo trabó dando tensión adecuada. Preparó la espada alisándola con cera, luego la bobina con el hilo de la trama. Debía ser cuidadoso porque solo un tejido haría.');
    // this.relato.contenido.push('El cisne no navegaba por el lago aún, porque el lago era solo un sueño.');
    // this.relato.contenido.push('Tensó el rollo plegador una vez más, la cala se abrió, puso la espada y el bastón de arrastre. Hizo la primera pasada y con el peine ajustó contra el rollo de la urdimbre, cambió la posición de las lisas, realizó la segunda pasada, prensó con el bastón de arrastre y peinó ajustando la trama. Tejió por largo tiempo. Debía ser exacto en la cantidad de pasadas, solo este saldría de sus manos.');
    // this.relato.contenido.push('Una luz a lo lejos se vio brillar, la creación daba comienzo.');
    //
    // this.comentarios = new Array();
    // this.opinionWriter = new Usuario();

  }

  getBackgroundImage() {
    return 'linear-gradient(to bottom,' + this.relato.categoria.opacidad + ',' + this.relato.categoria.color + ')';
  }

  getNumber(numero: number) {
    if (numero >= 1000) return '+' + Math.round(numero / 1000) + 'K';
    return numero;

  }

  addLista() {
    this.added = true;
  }

  deleteLista() {
    this.added = false;
  }

  like() {
    if (this.auth.isLoggedIn()) {
      this.relatoService.likeRelato(this.relato.id, this.auth.getUser().id).subscribe((estadistica) => {
        this.relato.estadistica = estadistica;
      });
    } else {
      this.popOverService.setVisible(true);
    }
  }

  liked() {
    if (this.relato && this.relato.estadistica && this.relato.estadistica.likers && this.auth.isLoggedIn()) {
      return this.relato.estadistica.likers.indexOf(this.auth.getUser().id) !== -1;
    } else {
      return false;
    }
  }

  addComent(event: string) {
    this.comentarios.push(event);
    // console.log(event);
  }

  setOpinionWriter(event: Usuario) {
    this.opinionWriter = event;
    console.log(this.opinionWriter);

  }




}
