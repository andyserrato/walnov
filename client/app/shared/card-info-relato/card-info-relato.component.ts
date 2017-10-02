import { Component, OnInit, Input } from '@angular/core';
import { RepositorioService } from '../../services/repositorio.service';
import { AuthenticationService } from '../../services/authentication.service';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-card-info-relato',
  templateUrl: './card-info-relato.component.html',
  styleUrls: ['./card-info-relato.component.scss']
})
export class CardInfoRelatoComponent implements OnInit {
  @Input() relato: any;
  constructor(private repositorio: RepositorioService, private auth: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    // console.log(this.relato);
  }

  getBorder() {
    return 'solid 1.5px ' + this.repositorio.categoriasHM.get(this.relato.categoria.nombre).color;

  }

  getColor() {
    return this.relato.categoria.color;
  }

  formatearNumero(nStr) {
    nStr += '';
    const x = nStr.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? ',' + x[1] : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
  }

  goToUser() {
    // console.log(this.relato);
    this.router.navigateByUrl('user-profile/'+this.relato.autor.id+'/relatos');
  }

  checkUser() {
    if (this.relato.autor) {
      return this.auth.isLoggedIn() && this.relato.autor.id === this.auth.getUser().id;
    }
  }

}
