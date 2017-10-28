import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Categoria} from '../../../models/cats';
import {RepositorioService} from '../../../services/repositorio.service';
import {Relato} from '../../../models/relato.model';
import {Usuario} from '../../../models/usuario.model';
import {Paginator} from '../../../models/paginador';
import {TranslateService} from "../../../translate/translate.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {BibliotecaService} from "../../../services/biblioteca.service";

@Component({
  selector: 'app-guardado-relatos',
  templateUrl: './guardado-relatos.component.html',
  styleUrls: ['./guardado-relatos.component.scss']
})
export class GuardadoRelatosComponent implements OnInit {
  @ViewChild('contenedorBiblioteca') contenedorBiblioteca: ElementRef;
  relatos: Array<any>;
  noContent = false;
  message: any;
  constructor(private repositorio: RepositorioService,
              private bibliotecaService: BibliotecaService,
              private auth: AuthenticationService,
              private translate: TranslateService) {
  }

  // todo revisar esto
  ngOnInit() {
    // for (let i = 0; i < 25; i++) {
    //   for (let j = 0; j < 10; j++) {
    //     const nuevoRL = new Relato();
    //
    //
    //     nuevoRL.categoria = this.repositorio.categoriasAL[j];
    //     nuevoRL.titulo = 'Hola' + i;
    //     nuevoRL.urlImagen = 'https://lorempixel.com/158/129';
    //     nuevoRL.coments = 200324;
    //     nuevoRL.resumen = 'Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. Meggings ' +
    //       'cred before they sold out messenger bag.';
    //     nuevoRL.likes = 784;
    //     nuevoRL.views = 2000;
    //     nuevoRL.usuario = new Usuario();
    //     nuevoRL.usuario.nombre = 'Amorentrelineas';
    //     nuevoRL.usuario.imagen = 'https://lorempixel.com/22/22';
    //     this.repositorio.relatos.push(nuevoRL);
    //   }
    // }
    this.obtenerrelatosFromBiblioteca();
  }

  obtenerrelatosFromBiblioteca() {
    if (this.auth.isLoggedIn()) {
      this.bibliotecaService.getRelatoBibliotecaByCurrentUserId().subscribe(relatos => {
        if (relatos && relatos.relatos && relatos.relatos.length > 0) {
          this.repositorio.paginadorCardsRelatos = new Paginator(relatos.relatos, this.contenedorBiblioteca, 12, 6);
        } else {
          this.showNoContent();
        }
      });
    } else {
      this.showNoContent();
    }
  }

  showNoContent() {
    this.noContent = true;
    this.message = { text: this.translate.instant('shared_no_content_ver_relatos'),
      enlace: '/relatos', buttonText: this.translate.instant('shared_no_content_ver_relatos_button_text') };
  }

}
