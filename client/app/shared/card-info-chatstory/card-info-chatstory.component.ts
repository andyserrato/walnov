import { Component, OnInit, Input } from '@angular/core';
import { RepositorioService } from '../../services/repositorio.service';
import { ChatStory } from '../../models/chatstory.model';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { ChatstoryService } from '../../services/chatstory.service';

@Component({
  selector: 'app-card-info-chatstory',
  templateUrl: './card-info-chatstory.component.html',
  styleUrls: ['./card-info-chatstory.component.scss']
})
export class CardInfoChatstoryComponent implements OnInit {
  @Input() chatstory: any;
  constructor(private repositorio: RepositorioService,
              private router: Router) {
  }

  ngOnInit() {
  }

  getBorder() {
    return 'solid 1.5px ' + this.repositorio.categoriasHM.get(this.chatstory.categoria.nombre).color;

  }

  getColor() {
    return this.chatstory.categoria.color;

  }

  formatearNumero(nStr) {
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? ',' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
  }

  goToUser() {
    this.router.navigateByUrl('user-profile/'+this.chatstory.autor.id+'/walls');
  }

}
