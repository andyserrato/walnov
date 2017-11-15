import {Component, OnInit, Input} from '@angular/core';
import {Usuario} from '../../models/usuario.model';
import {RelatoService} from '../../services/relato.service';
import {AuthenticationService} from '../../services/authentication.service';
import {RegisterPopoverService} from '../../services/register-popover.service';

@Component({
  selector: 'app-opinion-usuario',
  templateUrl: './opinion-usuario.component.html',
  styleUrls: ['./opinion-usuario.component.scss']
})
export class OpinionUsuarioComponent implements OnInit {
  private _opiniones = new Array<any>();
  @Input() relatoId;
  constructor(private relatosService: RelatoService,
              private auth: AuthenticationService,
              private popOverService: RegisterPopoverService) {
  }

  ngOnInit() {
  }

  reportar(opinion) {
    if (this.auth.isLoggedIn()) {
      this.relatosService.reportRelato(opinion._id, this.relatoId).subscribe(
        () => {
          opinion.reporters.push(this.auth.getUser().id);
        });
    } else {
      this.popOverService.setVisible(true);
    }
  }

  reportado(opinion): boolean {
    if (this.auth.isLoggedIn() && opinion && opinion.reporters) {
      return opinion.reporters.indexOf(this.auth.getUser().id) !== -1;
    } else {
      return false;
    }
  }

  @Input()
  set opiniones(opiniones: Array<any>) {
    this._opiniones = opiniones;
  }

  get opiniones(): Array<any> { return this._opiniones; }

}
