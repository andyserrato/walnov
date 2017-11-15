import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {RepositorioService} from '../../../services/repositorio.service';
import {Paginator} from '../../../models/paginador';
import {TranslateService} from '../../../translate/translate.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {BibliotecaService} from '../../../services/biblioteca.service';

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

  ngOnInit() {
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
