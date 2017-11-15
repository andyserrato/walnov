import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Categoria } from '../../../models/cats';
import { RepositorioService } from '../../../services/repositorio.service';
import { Relato } from '../../../models/relato.model';
import { Usuario } from '../../../models/usuario.model';
import { Paginator } from '../../../models/paginador';
import {AlertService} from "../../../services/alert.service";
import {TranslateService} from "../../../translate/translate.service";
import {RelatoService} from "../../../services/relato.service";
import {BibliotecaService} from "../../../services/biblioteca.service";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-user-content-relatos',
  templateUrl: './user-content-relatos.component.html',
  styleUrls: ['./user-content-relatos.component.scss']
})
export class UserContentRelatosComponent implements OnInit {
  @ViewChild('contenedorBiblioteca') contenedorBiblioteca: ElementRef;
  skip = 0;
  noContent = false;
  message: any;
  constructor(private repositorio: RepositorioService,
              private auth: AuthenticationService,
              private bibliotecaService: BibliotecaService,
              private relatoService: RelatoService,
              private translate: TranslateService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.repositorio.paginadorCardsRelatos = new Paginator(this.repositorio.relatos, this.contenedorBiblioteca, 12, 6);
    if (this.auth.isLoggedIn()) {
      this.firstQuery();
    } else {
      this.showNoContent();
    }
  }

  firstQuery() {
    const myParams = new URLSearchParams();
    myParams.append('autor', this.repositorio.idUsuario);
    myParams.append('sort', '-fechaCreacion');
    myParams.append('top', '12');
    myParams.append('skip', this.skip + '');
    myParams.append('activo', 'true');

    this.relatoService.getRelatoByQueryParams(myParams).subscribe(relatos => {
      if (relatos && relatos.length > 0) {
        this.noContent = false;
        if (!this.bibliotecaService.getCurrentBiblioteca()) {
          this.bibliotecaService.getBibliotecaByCurrentUserId().subscribe(biblioteca => {
            this.bibliotecaService.updateBiblioteca(biblioteca);
            this.repositorio.paginadorCardsRelatos = new Paginator(relatos, this.contenedorBiblioteca, 12, 9);
            this.skip += 12;
          });
        } else {
          this.repositorio.paginadorCardsRelatos = new Paginator(relatos, this.contenedorBiblioteca, 12, 9);
          this.skip += 12;
        }
      } else {
        this.showNoContent();
      }
    }, error => {
    });

  }

  loadMore() {
    const myParams = new URLSearchParams();
    myParams.append('autor', this.repositorio.idUsuario);
    myParams.append('sort', '-fechaCreacion');
    myParams.append('top', '12');
    myParams.append('skip', this.skip + '');
    myParams.append('activo', 'true');

    this.relatoService.getRelatoByQueryParams(myParams).subscribe(relatos => {
      if (relatos.length > 0) {
        for (const c of relatos) {
          this.repositorio.paginadorCardsRelatos.push(c);
        }
        this.repositorio.paginadorCardsRelatos.paginarDelante();
        this.repositorio.paginadorCardsRelatos.final = false;
        // this.visible = true;
        this.skip += 12;
      } else {
        this.alertService.warning(this.translate.instant('alert_chatstory_acabados'));
        this.repositorio.paginadorCardsRelatos.final = false;
      }

    }, error => {
    });
  }

  scrollTop() {
    this.repositorio.paginadorCardsRelatos.container.nativeElement.scrollTop = 0;
  }

  showNoContent() {
    // todo cambiar mensaje
    this.noContent = true;
    this.message = { text: this.translate.instant('shared_no_content_ver_relatos'),
      enlace: '/relatos', buttonText: this.translate.instant('shared_no_content_ver_relatos_button_text') };
  }

}
