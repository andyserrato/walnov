import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import {RepositorioService} from '../../../services/repositorio.service';
import {Relato} from '../../../models/relato.model';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {AlertService} from '../../../services/alert.service';
import {ModalService} from '../../../services/modal.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {TranslateService} from '../../../translate';
import {RegisterPopoverService} from '../../../services/register-popover.service';
import {RelatoService} from '../../../services/relato.service';

@Component({
  selector: 'app-crear-relato-content',
  templateUrl: './crear-relato-content.component.html',
  styleUrls: ['./crear-relato-content.component.scss']
})

export class CrearRelatoContentComponent implements OnInit {
  @Input() relato: any;
  friends: Array<string>;
  dedicatorias: Array<string>;
  dedicatoriaForm: FormControl;
  complexForm: any;
  popover = false;
  publicando = false;
  borrador = false;
  relatoUrl = '/relato/';
  @ViewChild('textarea') textarea: ElementRef;

  constructor(private repositorio: RepositorioService,
              fb: FormBuilder,
              private alert: AlertService,
              private modal: ModalService,
              private auth: AuthenticationService,
              private translate: TranslateService,
              private registerService: RegisterPopoverService,
              private relatoService: RelatoService) {
    this.dedicatorias = new Array<string>();
    this.friends = new Array<string>();
    this.complexForm = fb.group({
      'title': [null, Validators.compose([Validators.required, Validators.maxLength(30)])],
      'content': [null, Validators.compose([Validators.required, Validators.maxLength(3000), Validators.minLength(140)])]
    });
    this.dedicatoriaForm = new FormControl();
    this.dedicatoriaForm.setValidators(Validators.compose([Validators.required, Validators.email]));
  }

  ngOnInit() {
  }

  newFriend(event) {
    if (event.value) {
      if(this.friends.indexOf(event.value) === -1) {
        this.friends.push(event.value);
      } else {
        this.alert.warning(this.translate.instant('alert_existent_invitation'));
      }
    }
    event.value = '';
  }

  deleteFriend(event) {
    this.friends.splice(this.friends.indexOf(event), 1);
  }

  newDedicatoria(event) {
    if (this.dedicatoriaForm.valid) {
      if(this.dedicatorias.indexOf(event.target.value) === -1) {
        this.dedicatorias.push(event.target.value);
      } else {
        this.alert.warning(this.translate.instant('alert_existent_email'));
      }
      event.target.value = '';
    } else {
      this.alert.warning(this.translate.instant('alert_wrong_email'));
    }

  }

  deleteDedicatoria(event) {
    this.dedicatorias.splice(this.dedicatorias.indexOf(event), 1);
  }

  changeImage(event) {
    this.relato.urlImagen = event;
  }

  publicarRelato() {
    this.esperarPublicar();
    if (this.complexForm.valid) {
      if (this.auth.isLoggedIn()) {
        if (this.relato.tipo === 0) {
          this.alert.warning(this.translate.instant('alert_relato_existente'));
          this.alert.clearTimeOutAlert();
        } else if (!this.relato.tipo) {
          this.createRelato(0);
        } else if (this.relato.tipo === 1) {
          this.modificarRelato(0);
        }
      } else {
        this.registerService.setVisible(true);
      }
    } else {
      this.complexForm.controls['title'].markAsTouched();
      this.complexForm.controls['content'].markAsTouched();
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async esperarPublicar() {
    this.publicando = true;
    await this.sleep(3000);
    this.publicando = false;
  }

  async esperarBorrador() {
    this.borrador = true;
    await this.sleep(3000);
    this.borrador = false;
  }

  guardarComoBorradorRelato() {
    this.esperarBorrador();
    if (this.complexForm.valid) {
      if (this.auth.isLoggedIn()) {
        if (this.relato.tipo === 0) {
          this.alert.warning(this.translate.instant('alert_relato_existente'));
          this.alert.clearTimeOutAlert();
          // this.publicando = false;
        } else if (!this.relato.tipo && this.relato.tipo !== 0) {
          this.createRelato(1);
          // this.publicando = false;
        } else if (this.relato.tipo && this.relato.tipo === 1) {
          this.modificarRelato(1);
          // this.publicando = false;
        }
      } else {
        this.registerService.setVisible(true);
      }
    } else {
      // this.publicando = false;
      this.complexForm.controls['title'].markAsTouched();
      this.complexForm.controls['content'].markAsTouched();
    }
  }

  share() {
    this.modal.share(this.translate.instant('modal_relato_posted'), '');
    this.publicando = true;
    setTimeout(() => {
      this.publicando = false;
    }, 1000);
  }

  /**
   * Crea un relato nuevo
   */
  createRelato(tipo: number) {
    this.relato.tipo = tipo;
    this.relato.autor = this.auth.getUser().id;
    this.relato.autorNombre = this.auth.getUser().perfil.display_name;
    const relatoInterface = {lang: this.translate.currentLang, relato: this.relato};
    relatoInterface.relato.categoria = this.relato.categoria.nombre;

    this.relatoService.createRelato(relatoInterface).subscribe(relatoSaved => {
      this.publicarMensajeFeedback(relatoSaved);
    }, error => {
      this.alert.error(this.translate.instant('alert_relato_insersion'));
    });
  }

  modificarRelato(tipo: number) {
    this.relato.tipo = tipo;
    const relatoInterface = {lang: this.translate.currentLang, relato: this.relato};
    relatoInterface.relato.categoria = this.relato.categoria.nombre;

    this.relatoService.updateRelato(relatoInterface).subscribe(relatoSaved => {
      this.publicarMensajeFeedback(relatoSaved);
    }, error => {
      this.alert.error(this.translate.instant('alert_relato_insersion'));
    });

  }

  publicarMensajeFeedback(relatoSaved: any) {
    if (relatoSaved.tipo === 0) {
      this.modal.share(this.translate.instant('modal_relato_posted'), this.relatoUrl + relatoSaved.id);
    } else if (relatoSaved.tipo === 1) {
      this.relato = relatoSaved;
      this.relato.categoria = this.repositorio.getCategoriaALByName(this.relato.categoria);
      this.alert.success(this.translate.instant('alert_relato_borrador'));
    }
  }
}
