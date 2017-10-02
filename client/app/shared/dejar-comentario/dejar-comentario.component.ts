import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Usuario} from '../../models/usuario.model';
import {AuthenticationService} from '../../services/authentication.service';
import {AlertService} from '../../services/alert.service';
import {TranslateService} from '../../translate/translate.service';
import {RelatoService} from '../../services/relato.service';
import {RegisterPopoverService} from '../../services/register-popover.service';

@Component({
  selector: 'app-dejar-comentario',
  templateUrl: './dejar-comentario.component.html',
  styleUrls: ['./dejar-comentario.component.scss']
})
export class DejarComentarioComponent implements OnInit {
  @Input() relato: any;
  @Input() opinionSibling: any;
  user: any;
  localComent: string;
  @Output() opinion: EventEmitter<any>;

  constructor(private auth: AuthenticationService,
              private alert: AlertService,
              private translate: TranslateService,
              private relatoService: RelatoService,
              private popOverService: RegisterPopoverService) {
    this.opinion = new EventEmitter();
  }

  ngOnInit() {
    this.localComent = '';
  }

  publicaComentario(event) {
    if (this.auth.isLoggedIn()) {
      if (this.localComent.length <= 10) {
        this.alert.warning(this.translate.instant('alert_comment_length'));
      } else {
        const opinionInterface = {
          idRelato: this.relato.id,
          seguidores: this.auth.getUser().seguidores,
          opinion: {
            texto: this.localComent,
            urlImagen: '',
            autor: this.auth.getUser().id,
            autorNombre: this.auth.getUser().perfil.display_name
          }
        };

        this.relatoService.addOpinionToRelato(opinionInterface).subscribe(relato => {
            this.relato = relato;
            this.opinionSibling.opiniones = this.relato.opiniones;
          },
          error => {
            this.alert.error(error);
          });
        this.localComent = '';
      }
    } else {
      this.popOverService.setVisible(true);
    }
  }

  obtenerProfileName() {
    if (this.auth.isLoggedIn() && this.auth.getUser().perfil.display_name) {
      return this.auth.getUser().perfil.display_name;
    } else if (this.auth.isLoggedIn() && this.auth.getUser().login) {
      return this.auth.getUser().login;
    } else {
      return 'Walgo';
    }
  }

  obtenerProfilePicture() {
    if (this.auth.isLoggedIn() && this.auth.getUser() && this.auth.getUser().perfil && this.auth.getUser().perfil.foto_perfil) {
      return this.auth.getUser().perfil.foto_perfil;
    } else {
      return 'https://lorempixel.com/30/30';
    }
  }
}
