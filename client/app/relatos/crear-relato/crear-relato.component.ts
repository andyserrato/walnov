import { Component, OnInit } from '@angular/core';
import { Relato } from '../../models/relato.model';
import { RepositorioService } from '../../services/repositorio.service';
import { CardInformativoComponent } from '../../shared/card-informativo/card-informativo.component';

@Component({
  selector: 'app-crear-relato',
  templateUrl: './crear-relato.component.html',
  styleUrls: ['./crear-relato.component.scss']
})
export class CrearRelatoComponent implements OnInit {
  relato: any;
  constructor(private repositorio: RepositorioService) {
    this.relato = new Relato();
    this.relato.categoria = this.repositorio.categoriasAL[0];
  }

  ngOnInit() {
  }

  getInfoCard() {
    return CardInformativoComponent.showCard;
  }

}
